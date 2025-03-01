import React from 'react';

import { GalleryCardProps } from './types';

const GalleryCard: React.FC<GalleryCardProps> = ({ title, description, date }) => {
    return (    
        <div className="flex flex-col w-[15vw] h-[19vw] bg-[#FCFCFC] rounded-[20px] p-4 border-4 border-white hover:cursor-pointer">
            <div className="w-full h-12 bg-[#C9DEFF] rounded-[20px] flex justify-center items-center text-[#4780CC]">
                <div className="w-[90%] h-[70%] rounded-[20px] p-3 bg-white flex justify-center items-center">
                    <h1>{date}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-[0.8vw] text-left h-full relative">
                {/* <h3 className="gallery-card__title">{title}</h3>*/}
                <p className="gallery-card__description">{description}</p> 
                <div className='absolute bottom-0 right-0'>
                    <button className="rounded-full w-[2vw] h-[2vw] bg-[#C9DEFF] flex justify-center items-center text-center"></button>
                </div>
            </div>
        </div>
    );
};


export default GalleryCard;