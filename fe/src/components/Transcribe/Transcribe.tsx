import { useState } from 'react';
import { ReactMic } from 'react-mic';
import { RecordedBlob } from './types';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startRecording, stopRecording } from "../../store/recorderSlice"; 
import { useAudioTranscription } from "./hooks.ts";
import SaveModal from '../Save/SavePopup.tsx';

const Transcribe: React.FC = () => {
    
    const { postAudio, transcription } = useAudioTranscription();
    const [record, setRecord] = useState(false);
    const [enableSave, setEnableSave] = useState(false);
    const [enableDelete, setEnableDelete] = useState(false);
    // const [recording, setRecording] = useState<RecordedBlob | null>(null);
    const [recordingName, setRecordingName] = useState("untitiled recording");
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<AppDispatch>(); 

    const handleStartRecording = () => {
        setRecord(true);
        dispatch(startRecording());
    };

    // const handleEditing = () => {
    //     setIsEditing(true);
    // };

    const enableSaveOrDelete = () => {
        setEnableSave(true);
        setEnableDelete(true);
    };

    const disableSaveOrDelete = () => {
        setEnableSave(false);
        setEnableDelete(false);
    };

    const onDelete = () => {
        disableSaveOrDelete();
    };

    const handleStopRecording = () => {
        setRecord(false);
        dispatch(stopRecording());
        enableSaveOrDelete();
    };

    const onData = (recordedData: Blob) => {
        return recordedData;
    };

    const onStop = (recordedBlob: RecordedBlob) => {
        console.log('Recorded blob:', recordedBlob);
        const audioUrl = URL.createObjectURL(recordedBlob.blob);
        const audioPlay = new Audio(audioUrl);
        // setRecording(recordedBlob);
        audioPlay.play();
        postAudio(recordedBlob.blob);
    };

    const onSave = () => {
        setOpenSaveModal(true);
    };
    
    return (
        <div className="w-[45vw] h-[40vw] rounded-[20px] bg-[#FCFCFC]">
            <div className="w-full h-[3.5vw] bg-[#C9DEFF] border-3 border-white border-b-0 rounded-t-[20px] flex items-center">
                <input
                    placeholder={recordingName}
                    onChange={(e) => setRecordingName(e.target.value)}
                    onFocus={() => setIsEditing(true)}
                    className="text-[#4780CC] text-[18px] z-[1] focus:outline-none py-[1vw] pl-[2.8vw] w-[90%] placeholder:text-[#4780CC]"
                />
                <button 
                    type="button" 
                    onClick={() => document.querySelector('input')?.focus()}
                    className="focus:outline-none ml-[-28.5vw]"
                >
                { !isEditing ? 
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1123 4.95503L5.20978 13.8575C4.41478 14.66 2.03728 15.0275 1.45978 14.495C0.882284 13.9625 1.30227 11.585 2.09727 10.7825L10.9998 1.88005C11.4109 1.48856 11.9587 1.27328 12.5263 1.28019C13.0939 1.28711 13.6363 1.51568 14.0377 1.91708C14.4391 2.31848 14.6677 2.86091 14.6746 3.42852C14.6816 3.99614 14.4663 4.54397 14.0748 4.95503H14.1123Z" stroke="#7390B5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.75 14.75H8" stroke="#4780CC" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                :
                                <div className="flex justify-center items-center" />}

                </button>
            </div>
            <div className="p-[3vw] text-lg text-[#4F4F4F] font-light w-full h-[28vw]">
            {enableSave && enableDelete ? (
                <div className='w-full h-full'>
                    <mark className="bg-blue-200 px-1 text-[#2b2b2b] rounded-md">Phonetics:</mark> { transcription ? transcription : "loading..."}
                </div>
            ) : (
                <div className='w-full h-full'>
                    <mark className="bg-blue-200 px-1 text-[#2b2b2b] rounded-md">Phonetics:</mark>
                </div>
            )}
            <SaveModal isOpen={openSaveModal} onClose={() => setOpenSaveModal(false)} Name={recordingName}></SaveModal>
            </div>
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
                <div className='w-full flex justify-center items-center gap-3'>
                    {
                        enableSave && enableDelete && (
                            <div className="flex w-[75%] justify-between items-center">
                                <button 
                                    className="w-[45%] bg-[#4780CC] h-[2.5vw] rounded-full flex justify-center items-center hover:cursor-pointer transition hover:duration-300 hover:ease-in hover:bg-blue-700"
                                    onClick={onSave}
                                >
                                    <h2 className="text-white font-poppins text-[18px] font-semibold text-md mx-auto">
                                        Save
                                    </h2>
                                </button>
                                <button 
                                    className="w-[45%] bg-red-500 h-[2.5vw] rounded-full flex justify-center items-center hover:cursor-pointer transition hover:duration-300 hover:ease-in hover:bg-red-700"
                                    onClick={onDelete}
                                >
                                    <h2 className="text-white font-poppins text-[18px] font-semibold text-md mx-auto">
                                        Delete
                                    </h2>
                                </button>
                            </div>
                        )
                    }
                </div>
                <button 
                    className="w-[75%] bg-[#4780CC] h-[2.5vw] rounded-full flex justify-between items-center hover:cursor-pointer transition active:delay-[500ms] hover:duration-300 hover:ease-in hover:bg-blue-700 active:duration-300 active:ease-in active:bg-red-500" 
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
