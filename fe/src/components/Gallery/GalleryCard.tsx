import React from 'react';
import { GalleryCardProps } from './types';

const GalleryCard: React.FC<GalleryCardProps> = ({
  title,
  description,
  date,
  onClick,
  onDelete,
  isSelected,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      className={`flex w-[200px] min-w-[200px] flex-shrink-0 flex-col overflow-hidden rounded-xl border-2 bg-white shadow-md transition-all hover:shadow-lg ${
        isSelected
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="border-b border-gray-100 bg-gray-50 px-3 py-2">
        <p className="truncate text-xs font-medium text-gray-500">{date}</p>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="truncate text-sm font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 line-clamp-3 min-h-[3rem] text-xs text-gray-600">{description}</p>
        <div className="mt-2 flex justify-end">
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Delete recording"
              aria-label="Delete recording"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
