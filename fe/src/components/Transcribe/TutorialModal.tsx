interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-poppins">
      <div className="bg-white rounded-xl shadow-lg w-[90vw] max-w-md overflow-hidden mx-4">
        <div className="w-full p-5 bg-[#C9DEFF] flex items-center justify-between">
          <h2 className="text-xl text-[#4780CC] font-semibold">How to use</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/30 hover:cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#4780CC]"
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
        <div className="p-5 text-[#2b2b2b] text-base leading-relaxed">
          <p>
            Press and hold the record button and wait for the magic to happen.
          </p>
          <p className="mt-3 text-gray-600 text-sm">
            Release when you’re done speaking. Your recording will be transcribed automatically.
          </p>
        </div>
        <div className="p-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#4780CC] text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors hover:cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
