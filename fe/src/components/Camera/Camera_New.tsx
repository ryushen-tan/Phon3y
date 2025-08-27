import React, { useRef } from 'react';
import { useCameraStream, useRecordingControl, useMouthTracking, useTrackingLoop } from './hooks';

const Camera: React.FC = () => {
    const overlayRef = useRef<HTMLCanvasElement | null>(null);
    
    // Use custom hooks to manage different aspects of the camera
    const { streamRef, videoRef } = useCameraStream();
    useRecordingControl(streamRef); // Recording control happens internally
    const {
        trackingActiveRef,
        inFlightRef,
        sessionIdRef,
        lastLandmarksRef,
        stableLandmarksRef,
        drawLandmarksOnOverlay
    } = useMouthTracking();

    // Set up the tracking loop
    useTrackingLoop(videoRef, overlayRef, drawLandmarksOnOverlay, {
        trackingActiveRef,
        inFlightRef,
        sessionIdRef,
        lastLandmarksRef,
        stableLandmarksRef
    });

    return (
        <div className="relative">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className='rounded-xl w-[47vw] h-[20vw] bg-black transform scale-x-[-1] object-cover border-2 border-white'
            />
            <canvas ref={overlayRef} className="absolute left-0 top-0 w-[47vw] h-[20vw] pointer-events-none" />
        </div>
    );
};

export default Camera;
