import { useState } from 'react';
import { ReactMic } from 'react-mic';
import { RecordedBlob } from './types';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startRecording, stopRecording } from "../../store/recorderSlice"; 
import { useAudioTranscription } from "./hooks.ts";

const Transcribe: React.FC = () => {
    
    const { postAudio } = useAudioTranscription();
    const [record, setRecord] = useState(false);
    const dispatch = useDispatch<AppDispatch>(); 

    const handleStartRecording = () => {
        setRecord(true);
        dispatch(startRecording());
    };

    const handleStopRecording = () => {
        setRecord(false);
        dispatch(stopRecording());
    };

    const onData = (recordedData: Blob) => {
        console.log('Chunk of real-time data:', recordedData);
    };

    const onStop = (recordedBlob: RecordedBlob) => {
        console.log('Recorded blob:', recordedBlob);
        const audioUrl = URL.createObjectURL(recordedBlob.blob);
        const audioPlay = new Audio(audioUrl);
        audioPlay.play();
        postAudio(recordedBlob.blob);
        console.log('Audio blob:', recordedBlob.blob);
    };
    
    return (
        <div className="w-250 h-200 rounded-[20px] bg-[#FCFCFC]">
            <div className="w-full h-16 bg-[#C9DEFF] border-3 border-white border-b-0 rounded-t-[20px] flex">
                <input
                    placeholder="untitled recording"
                    className="text-[#4780CC] text-[18px] z-[1] focus:outline-none py-3 pl-12 w-[25%] placeholder:text-[#4780CC]"
                />
            </div>
            <div className="p-12 text-lg text-[#4F4F4F] font-light w-full h-160"></div>
            <div className="flex w-full justify-center items-center">
                <ReactMic
                    className="hidden"
                    record={record}
                    onStop={onStop}
                    echoCancellation={true}
                    noiseSuppression={true}
                    onData={onData}
                />
                <button 
                    className="w-[75%] bg-[#4780CC] h-12 rounded-full flex justify-between items-center hover:cursor-pointer active:bg-[#42618B]" 
                    onMouseDown={handleStartRecording} 
                    onMouseUp={handleStopRecording}
                >
                    <h2 className="text-white font-poppins text-[18px] font-semibold text-md mx-auto pl-8">Hold to Record</h2>
                    <div className="mr-4">
                        <svg
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                stroke="white"
                                strokeWidth="3.75"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Transcribe;
