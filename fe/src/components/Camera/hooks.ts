import { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Point = { x?: number; y?: number; px?: number; py?: number };

// Hook for managing camera stream
export const useCameraStream = () => {
    const streamRef = useRef<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function preloadCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }

        preloadCamera();

        return () => {
            // Stop camera when component unmounts
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);

    return {
        streamRef,
        videoRef
    };
};

// Hook for managing recording state
export const useRecordingControl = (streamRef: React.RefObject<MediaStream | null>) => {
    const isRecording = useSelector((state: RootState) => state.recorder.isRecording);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = useCallback(async () => {
        if (!streamRef.current) return;

        const mediaRecorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
    }, [streamRef]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    }, []);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    return {
        isRecording,
        mediaRecorderRef
    };
};

// Hook for managing mouth tracking functionality
export const useMouthTracking = () => {
    const isTrackingMouth = true;
    const trackingIntervalRef = useRef<number | null>(null);
    const trackingActiveRef = useRef(false);
    const inFlightRef = useRef(false);
    const sessionIdRef = useRef<string | null>(null);
    const lastLandmarksRef = useRef<{ lips?: Point[] } | null>(null);
    const stableLandmarksRef = useRef<{ lips?: Point[] } | null>(null);

    // Drawing function for landmarks overlay
    const drawLandmarksOnOverlay = useCallback((canvas: HTMLCanvasElement, landmarks: { outer?: Point[]; inner?: Point[]; lips?: Point[] }, videoEl: HTMLVideoElement) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Display (CSS) size of the video element
        const displayW = videoEl.clientWidth || 640;
        const displayH = videoEl.clientHeight || 480;

        // Intrinsic video frame size
        const frameW = videoEl.videoWidth || displayW;
        const frameH = videoEl.videoHeight || displayH;

        // account for device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.style.width = `${displayW}px`;
        canvas.style.height = `${displayH}px`;
        canvas.width = Math.round(displayW * dpr);
        canvas.height = Math.round(displayH * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any previous transform
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(dpr, dpr); // work in CSS pixels from here

        // Mirror drawing horizontally to match the flipped video element
        ctx.save();
        ctx.translate(displayW, 0);
        ctx.scale(-1, 1);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'lime';
        ctx.fillStyle = 'rgba(0,255,0,0.9)';

        // compute scale and offset to account for object-fit: cover (video may be cropped)
        const scale = Math.max(displayW / frameW, displayH / frameH);
        const scaledFrameW = frameW * scale;
        const scaledFrameH = frameH * scale;
        const offsetX = (scaledFrameW - displayW) / 2;
        const offsetY = (scaledFrameH - displayH) / 2;

        const toCanvas = (p: Point) => {
            const px = (p.px ?? (p.x! * frameW));
            const py = (p.py ?? (p.y! * frameH));
            // position in scaled frame space then subtract crop offset
            const x = px * scale - offsetX;
            const y = py * scale - offsetY;
            return { x, y };
        };

        const drawContour = (pts: Point[], opts?: { dashed?: boolean; width?: number; color?: string; glow?: boolean }) => {
            if (pts.length === 0) return;
            ctx.save();
            
            // Professional styling with subtle glow effect
            const color = opts?.color ?? '#60a5fa'; // Light blue default
            ctx.lineWidth = opts?.width ?? 2;
            ctx.strokeStyle = color;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.shadowColor = color;
            ctx.shadowBlur = opts?.glow ? 8 : 0;
            ctx.globalAlpha = 0.85;
            
            if (opts?.dashed) ctx.setLineDash([6, 4]);

            ctx.beginPath();
            const start = toCanvas(pts[0]);
            ctx.moveTo(start.x, start.y);
            for (let i = 1; i < pts.length; i++) {
                const pt = toCanvas(pts[i]);
                ctx.lineTo(pt.x, pt.y);
            }
            // Close the path for lips to create a complete contour
            ctx.closePath();
            
            // Draw very subtle fill for professional appearance
            ctx.save();
            ctx.globalAlpha = 0.03; // Much more subtle fill
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
            
            // Draw the main stroke
            ctx.stroke();
            
            // Add inner highlight for depth
            ctx.save();
            ctx.globalAlpha = 0.2; // Reduced highlight intensity
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffffff';
            ctx.shadowBlur = 0;
            ctx.stroke();
            ctx.restore();
            
            ctx.setLineDash([]);
            ctx.restore();
        };

        // Clear the canvas first
        ctx.clearRect(0, 0, displayW, displayH);
        
        // Always show tracking indicator when tracking is active
        if (isTrackingMouth) {
            ctx.save();
            // Temporarily undo the mirror transform for text so it reads correctly
            ctx.scale(-1, 1);
            ctx.translate(-displayW, 0);
            
            ctx.font = '12px system-ui, -apple-system, sans-serif';
            ctx.fillStyle = '#60a5fa'; // Light blue color
            ctx.globalAlpha = 0.8;
            ctx.shadowColor = '#60a5fa';
            ctx.shadowBlur = 3;
            const text = 'TRACKING';
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, displayW - textWidth - 15, 25);
            
            // Add small dot indicator
            ctx.beginPath();
            ctx.arc(displayW - textWidth - 25, 20, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }

        // Draw the lip contour with professional styling
        if (landmarks.lips && landmarks.lips.length) {
            drawContour(landmarks.lips, { 
                dashed: false, 
                width: 2.5, 
                color: '#60a5fa', // Light blue color
                glow: true 
            });
            
            // Add subtle corner indicators for a more professional look
            const cornerPoints = [landmarks.lips[0], landmarks.lips[Math.floor(landmarks.lips.length * 0.25)], landmarks.lips[Math.floor(landmarks.lips.length * 0.75)]];
            cornerPoints.forEach(point => {
                if (point) {
                    const canvasPoint = toCanvas(point);
                    ctx.save();
                    ctx.globalAlpha = 0.4; // Reduced opacity for subtlety
                    ctx.fillStyle = '#60a5fa'; // Light blue color
                    ctx.shadowColor = '#60a5fa';
                    ctx.shadowBlur = 4;
                    ctx.beginPath();
                    ctx.arc(canvasPoint.x, canvasPoint.y, 1.5, 0, 2 * Math.PI); // Smaller dots
                    ctx.fill();
                    ctx.restore();
                }
            });
        }

        ctx.restore();
    }, [isTrackingMouth]);

    return {
        isTrackingMouth,
        trackingIntervalRef,
        trackingActiveRef,
        inFlightRef,
        sessionIdRef,
        lastLandmarksRef,
        stableLandmarksRef,
        drawLandmarksOnOverlay
    };
};

// Hook for managing the tracking loop and API communication
export const useTrackingLoop = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    overlayRef: React.RefObject<HTMLCanvasElement | null>,
    drawLandmarksOnOverlay: (canvas: HTMLCanvasElement, landmarks: { outer?: Point[]; inner?: Point[]; lips?: Point[] }, videoEl: HTMLVideoElement) => void,
    trackingRefs: {
        trackingActiveRef: React.RefObject<boolean>;
        inFlightRef: React.RefObject<boolean>;
        sessionIdRef: React.RefObject<string | null>;
        lastLandmarksRef: React.RefObject<{ lips?: Point[] } | null>;
        stableLandmarksRef: React.RefObject<{ lips?: Point[] } | null>;
    }
) => {
    const { trackingActiveRef, inFlightRef, sessionIdRef, lastLandmarksRef, stableLandmarksRef } = trackingRefs;

    useEffect(() => {
        // helper to create a session id once
        if (!sessionIdRef.current) {
            sessionIdRef.current = `sess_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        }

        let consecutiveNoFace = 0;
        let consecutive429 = 0;
        const fastInterval = 100;
        const slowInterval = 500;
        const max429Backoff = 5000;

        type SendResult =
            | { status: 200 }
            | { status: 422 }
            | { status: 429; retryAfterMs?: number | null }
            | { status: 'busy' | 'no-json' | 'error' | number };

        const sendFrame = async (blob: Blob): Promise<SendResult> => {
            if (inFlightRef.current) return { status: 'busy' };
            inFlightRef.current = true;
            try {
                const fd = new FormData();
                fd.append('frame', blob, 'frame.jpg');
                fd.append('session_id', sessionIdRef.current || 'unknown');

                const resp = await fetch('http://127.0.0.1:5000/mouth/track', {
                    method: 'POST',
                    body: fd,
                });

                if (resp.status === 422) {
                    // no face detected; keep showing last stable landmarks briefly to reduce flashing
                    if (stableLandmarksRef.current?.lips && overlayRef.current && videoRef.current) {
                        // Keep showing last stable landmarks to reduce flashing
                        drawLandmarksOnOverlay(overlayRef.current, stableLandmarksRef.current, videoRef.current);
                    }
                    return { status: 422 };
                }

                if (resp.status === 429) {
                    const txt = await resp.text().catch(() => '');
                    console.warn('Mouth track failed', resp.status, txt);
                    // try to read Retry-After header
                    const ra = resp.headers.get('Retry-After');
                    const retryAfterMs = ra ? parseInt(ra, 10) * 1000 : null;
                    return { status: 429, retryAfterMs };
                }

                if (!resp.ok) {
                    const txt = await resp.text().catch(() => '');
                    console.warn('Mouth track failed', resp.status, txt);
                    return { status: resp.status };
                }

                const json = await resp.json().catch(() => null);
                if (!json) return { status: 'no-json' };
                const landmarks = json.landmarks;
                if (landmarks && overlayRef.current && videoRef.current) {
                    const currentLips = landmarks.lips || [];
                    
                    // Always update stable landmarks with current detection
                    // Use gentle smoothing for temporal consistency
                    if (currentLips.length > 0) {
                        if (!stableLandmarksRef.current?.lips || stableLandmarksRef.current.lips.length !== currentLips.length) {
                            // First detection or structure change - use directly
                            stableLandmarksRef.current = { lips: currentLips };
                        } else {
                            // Apply gentle smoothing between consecutive frames (90% current, 10% previous)
                            const smoothed = currentLips.map((curr: Point, i: number) => {
                                const prev = stableLandmarksRef.current?.lips?.[i];
                                if (prev && curr.x !== undefined && curr.y !== undefined && prev.x !== undefined && prev.y !== undefined) {
                                    // Very light smoothing to just reduce jitter, not change detection
                                    return {
                                        x: curr.x * 0.9 + prev.x * 0.1,
                                        y: curr.y * 0.9 + prev.y * 0.1,
                                        px: curr.px,
                                        py: curr.py
                                    };
                                }
                                return curr;
                            });
                            stableLandmarksRef.current = { lips: smoothed };
                        }
                        
                        lastLandmarksRef.current = { lips: currentLips };
                        
                        // Draw with smoothed landmarks
                        drawLandmarksOnOverlay(overlayRef.current, stableLandmarksRef.current, videoRef.current);
                    }
                }
                return { status: 200 };
            } catch (err) {
                console.error('Error sending frame to mouth/track', err);
                return { status: 'error' };
            } finally {
                inFlightRef.current = false;
            }
        };

        const startTracking = () => {
            // adaptive capture loop using setTimeout to avoid overlapping intervals
            trackingActiveRef.current = true;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const run = async () => {
                if (!trackingActiveRef.current) return;
                if (!videoRef.current || !ctx) {
                    setTimeout(run, fastInterval);
                    return;
                }

                const vw = videoRef.current.videoWidth;
                const vh = videoRef.current.videoHeight;
                // only capture when video has real dimensions
                if (!vw || !vh || vw < 32 || vh < 32) {
                    setTimeout(run, fastInterval);
                    return;
                }

                canvas.width = vw;
                canvas.height = vh;
                ctx.drawImage(videoRef.current, 0, 0, vw, vh);

                const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.7));
                if (blob) {
                    const res = await sendFrame(blob);
                    let next = fastInterval;
                    if (res && res.status === 422) {
                        consecutiveNoFace++;
                        // Only clear overlay after many consecutive failures to reduce flashing
                        if (consecutiveNoFace >= 10 && overlayRef.current) {
                            const ctx = overlayRef.current.getContext('2d');
                            if (ctx) {
                                ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
                                // Still show tracking indicator
                                const isTrackingMouth = true;
                                if (isTrackingMouth) {
                                    ctx.save();
                                    // Temporarily undo the mirror transform for text so it reads correctly
                                    ctx.scale(-1, 1);
                                    ctx.translate(-overlayRef.current.width, 0);
                                    
                                    ctx.font = '12px system-ui, -apple-system, sans-serif';
                                    ctx.fillStyle = '#60a5fa'; // Light blue color
                                    ctx.globalAlpha = 0.8;
                                    ctx.shadowColor = '#60a5fa';
                                    ctx.shadowBlur = 3;
                                    const text = 'TRACKING';
                                    const textWidth = ctx.measureText(text).width;
                                    ctx.fillText(text, overlayRef.current.width - textWidth - 15, 25);
                                    
                                    // Add small dot indicator
                                    ctx.beginPath();
                                    ctx.arc(overlayRef.current.width - textWidth - 25, 20, 3, 0, 2 * Math.PI);
                                    ctx.fill();
                                    ctx.restore();
                                }
                            }
                            // Clear cached landmarks after extended failure
                            stableLandmarksRef.current = null;
                            lastLandmarksRef.current = null;
                        }
                        if (consecutiveNoFace >= 3) next = slowInterval;
                    } else if (res && res.status === 429) {
                        consecutive429++;
                        const r = res as { status: 429; retryAfterMs?: number | null };
                        const retryAfterMs = (r.retryAfterMs ?? Math.min(max429Backoff, 2000 * consecutive429));
                        next = retryAfterMs ?? Math.min(max429Backoff, 2000 * consecutive429);
                    } else if (res && res.status === 200) {
                        consecutiveNoFace = 0;
                        consecutive429 = 0;
                        next = fastInterval;
                    } else {
                        // on other errors, backoff a bit
                        next = slowInterval;
                    }

                    setTimeout(run, next);
                } else {
                    setTimeout(run, fastInterval);
                }
            };

            run();
        };

        const stopTracking = () => {
            trackingActiveRef.current = false;
        };

        const isTrackingMouth = true;
        if (isTrackingMouth) startTracking();
        else stopTracking();

        return () => stopTracking();
    }, [drawLandmarksOnOverlay, overlayRef, videoRef, trackingActiveRef, inFlightRef, sessionIdRef, lastLandmarksRef, stableLandmarksRef]);
};
