import React from "react";

const Transcribe = () => {
    return (
        <div className="w-180 h-160 rounded-[20px] bg-[#FCFCFC]">
            <div className="w-full h-12 bg-[#C9DEFF] border-3 border-white border-b-0 rounded-t-[20px] flex">
                <input
                    placeholder="untitled recording"
                    className="text-[#4780CC] z-[1] focus:outline-none py-3 pl-12 w-[25%]"
                />
                <div className="py-4 px-48 absolute">
                    <svg
                        width="20"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.1123 4.95503L5.20978 13.8575C4.41478 14.66 2.03728 15.0275 1.45978 14.495C0.882284 13.9625 1.30227 11.585 2.09727 10.7825L10.9998 1.88005C11.4109 1.48856 11.9587 1.27328 12.5263 1.28019C13.0939 1.28711 13.6363 1.51568 14.0377 1.91708C14.4391 2.31848 14.6677 2.86091 14.6746 3.42852C14.6816 3.99614 14.4663 4.54397 14.0748 4.95503H14.1123Z"
                            stroke="#7390B5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14.75 14.75H8"
                            stroke="#7390B5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />  
                    </svg>
                </div>
            </div>
            <div className="p-12 text-lg text-[#4F4F4F] font-light w-full h-128"></div>
            <div className="flex w-full justify-center items-center">
                <button className="w-[75%] bg-[#8499B4] h-12 rounded-full flex justify-center items-center hover:cursor-pointer active:bg-[#42618B]">
                    <h2 className="text-white font-bold text-md">Hold to Record</h2>
                    <div className="absolute ml-44 mt-[-11px]">
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