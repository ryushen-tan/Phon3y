import React, { useEffect, useState } from 'react';
import { SaveModalProps } from './types';

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, onSave, Name }) => {
    const [title, setTitle] = useState(Name);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [showInRecent, setShowInRecent] = useState(false);

    useEffect(() => {
        setTitle(Name);
    }, [Name]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            onSave({ title, description, date, showInRecent });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/10 bg-blur-xl bg-opacity-50 flex items-center justify-center z-50 font-poppins">
            <div className="bg-white rounded-xl shadow-lg w-[20vw] max-w-md overflow-hidden">
                <div className="w-full h-18 p-4 bg-[#C9DEFF] flex items-center">
                    <h2 className="text-xl text-center text-[#4780CC] font-medium">Save {Name}?</h2>
                    <button
                        onClick={onClose}
                        className="ml-auto hover:cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="w-full h-full bg-white p-4 flex flex-col gap-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block mb-1">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="border border-gray-300 px-3 py-2 rounded w-full font-poppins text-[16px] text-[#2b2b2b]"
                            />
                        </div>
                        <div >
                            <label htmlFor="description" className="block mb-1">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="border border-gray-300 px-3 py-2 rounded w-full text-[16px] text-[#2b2b2b]"
                            />
                        </div>
                        <div className='flex justify-between items-center'>
                            <div>
                                <label htmlFor="date" className="block mb-1">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date || new Date().toISOString().slice(0, 10)}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="border border-gray-300 px-3 py-2 rounded w-full text-[16px] text-[#2b2b2b]"
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="block mb-1">Time:</label>
                                <input
                                    type="time"
                                    id="time"
                                    value={time || new Date().toISOString().substring(11, 16)}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                    className="border border-gray-300 px-3 py-2 rounded w-full"
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="showInRecent"
                                checked={showInRecent}
                                onChange={(e) => setShowInRecent(e.target.checked)}
                                className="mr-2 w-3 h-3"
                            />
                            <label htmlFor="showInRecent">Show in Recent</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="submit"
                                className="bg-[#4780CC] text-white px-4 py-2 rounded hover:bg-blue-600 font-regular hover:cursor-pointer"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-regular hover:cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SaveModal;
