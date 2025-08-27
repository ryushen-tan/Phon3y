import React, { useEffect, useRef } from 'react';
import type { RecordedBlob } from './types';

interface RecorderProps {
    record: boolean;
    onStop: (recordedBlob: RecordedBlob) => void;
    onData?: (data: Blob) => void;
    className?: string;
    echoCancellation?: boolean;
    noiseSuppression?: boolean;
}

const Recorder: React.FC<RecorderProps> = ({
    record,
    onStop,
    onData,
    className,
    echoCancellation = true,
    noiseSuppression = true,
}) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (record) {
            // start recording
            (async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation,
                            noiseSuppression,
                        },
                    });
                    mediaStreamRef.current = stream;
                    chunksRef.current = [];
                    startTimeRef.current = Date.now();

                    const options: MediaRecorderOptions = {};
                    // prefer webm/opus if available
                    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                        options.mimeType = 'audio/webm;codecs=opus';
                    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                        options.mimeType = 'audio/webm';
                    }

                    const mr = new MediaRecorder(stream, options);
                    mediaRecorderRef.current = mr;

                    mr.ondataavailable = (e: BlobEvent) => {
                        if (e.data && e.data.size > 0) {
                            chunksRef.current.push(e.data);
                            if (onData) onData(e.data);
                        }
                    };

                    mr.onstop = () => {
                        const stopTime = Date.now();
                        const blob = new Blob(chunksRef.current, { type: chunksRef.current[0]?.type || 'audio/webm' });
                        const blobURL = URL.createObjectURL(blob);
                        const recorded: RecordedBlob = {
                            blob,
                            startTime: startTimeRef.current || 0,
                            stopTime,
                            blobURL,
                        };
                        onStop(recorded);

                        // cleanup
                        if (mediaStreamRef.current) {
                            mediaStreamRef.current.getTracks().forEach((t) => t.stop());
                            mediaStreamRef.current = null;
                        }
                        mediaRecorderRef.current = null;
                        chunksRef.current = [];
                        startTimeRef.current = null;
                    };

                    mr.start();
                } catch (err) {
                    console.error('Failed to start recording', err);
                }
            })();
        } else {
            // stop recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                try {
                    mediaRecorderRef.current.stop();
                } catch (err) {
                    console.error('Error stopping media recorder', err);
                }
            }
        }

        // if component unmounts while recording, stop and cleanup
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                try {
                    mediaRecorderRef.current.stop();
                } catch (e) {
                    // log cleanup errors
                    console.warn('Error stopping media recorder during cleanup', e);
                }
            }
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((t) => t.stop());
                mediaStreamRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [record]);

    return <div className={className} />;
};

export default Recorder;
