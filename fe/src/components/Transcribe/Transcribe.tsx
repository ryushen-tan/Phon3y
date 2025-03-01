import { useState } from 'react';
import { ReactMic } from 'react-mic';
import { RecordedBlob } from './types';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startRecording, stopRecording } from "../../store/recorderSlice"; 
import { useAudioTranscription } from "./hooks.ts";

const Transcribe: React.FC = () => {
    
    const { postAudio, transcription } = useAudioTranscription();
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
        <div className="w-[45vw] h-[40vw] rounded-[20px] bg-[#FCFCFC]">
            <div className="w-full h-[3.5vw] bg-[#C9DEFF] border-3 border-white border-b-0 rounded-t-[20px] flex">
                <input
                    placeholder="untitled recording"
                    className="text-[#4780CC] text-[18px] z-[1] focus:outline-none py-[1vw] pl-[2.8vw] w-[25%] placeholder:text-[#4780CC]"
                />
            </div>
            <div className="p-[3vw] text-lg text-[#4F4F4F] font-light w-full h-[30vw]"><mark className='bg-blue-200 px-1 text-[#2b2b2b] rounded-md'>Phonetics:</mark> {transcription}</div>
            <div className="flex flex-col w-full justify-center items-center gap-3">
                <h1 className='font-poppins text-gray-500 font-light text-[12px]'>note: Please only start recording after button turns red.</h1>
                <ReactMic
                    className="hidden"
                    record={record}
                    onStop={onStop}
                    echoCancellation={true}
                    noiseSuppression={true}
                    onData={onData}
                />
                <button 
                    className="w-[75%] bg-[#4780CC] h-[2.5vw] rounded-full flex justify-between items-center hover:cursor-pointer transition active:delay-[1000ms] active:duration-300 active:ease-in active:bg-red-500" 
                    onMouseDown={handleStartRecording} 
                    onMouseUp={handleStopRecording}
                >
                    <h2 className="text-white font-poppins text-[18px] font-semibold text-md mx-auto pl-[2vw]">Hold to Record</h2>
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
