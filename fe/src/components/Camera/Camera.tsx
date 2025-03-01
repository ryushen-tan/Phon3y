import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Camera: React.FC = () => {
    const isRecording = useSelector((state: RootState) => state.recorder.isRecording);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    // const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    useEffect(() => {
        async function preloadCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                console.log("Camera preloaded 🎥");
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

    const startRecording = async () => {
        if (!streamRef.current) return;

        const mediaRecorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = mediaRecorder;

        // mediaRecorder.ondataavailable = (event) => {
        //     if (event.data.size > 0) {
        //         setRecordedChunks((prev) => [...prev, event.data]);
        //     }
        // };

        mediaRecorder.start();
    };
    
    // const downloadRecording = () => {
    //     const blob = new Blob(recordedChunks, { type: 'video/webm' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = url;
    //     a.download = 'recording.webm';
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    // };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }, [isRecording]);

    return (
        <div>
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className='rounded-xl w-[47vw] h-[20vw] bg-black transform scale-x-[-1] object-cover border-2 border-white'
            />
        </div>
    );
};

export default Camera;
