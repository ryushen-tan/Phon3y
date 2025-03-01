import React, { useState } from 'react';
import { SaveModalProps } from './types';

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, onSave, Name }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [showInRecent, setShowInRecent] = useState(false);

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
            <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
                <h2 className="text-xl text-[#4780CC] font-semibold mb-4">Save {Name}?</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-1">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="border border-gray-300 px-3 py-2 rounded w-full font-poppins"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="border border-gray-300 px-3 py-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block mb-1">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="border border-gray-300 px-3 py-2 rounded w-full"
                        />
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
                            className="bg-[#4780CC] text-white px-4 py-2 rounded hover:bg-blue-600 font-regular"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-regular"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SaveModal;
