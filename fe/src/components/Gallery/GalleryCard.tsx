import React from 'react';

import { GalleryCardProps } from './types';

const GalleryCard: React.FC<GalleryCardProps> = ({ title, description, date }) => {
    return (
        <div className="gallery-card w-[20vw] h-[19vw] bg-white rounded-[20px] p-4">
            <h1>{date}</h1>
            <h3 className="gallery-card__title">{title}</h3>
            <p className="gallery-card__description">{description}</p>
        </div>
    );
};

export default GalleryCard;