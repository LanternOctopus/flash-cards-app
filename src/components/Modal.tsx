import React, {useState} from "react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title = "Modal Title" }: Props) => {
  if (!isOpen) {
    return null;
  }

  // Inline SVG for the Close Icon (replaces Lucide X)
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    // 1. Modal Overlay (Fixed, Covers Screen, High Z-Index)
    <div
      className="fixed inset-0 z-[100] bg-gray-900/70 backdrop-blur-sm transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      // Click handler for backdrop: prevents closing if click is directly on the content card.
      onClick={onClose} 
    >
      {/* 2. Positioning Container (Centers Content) */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* 3. Modal Content Card */}
        <div
          className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-2xl transition-all"
          onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking content
        >
          {/* Header and Close Button */}
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <h3 className="text-xl font-bold text-gray-900 leading-6" id="modal-title">
              {title}
            </h3>
            <button
              type="button"
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition"
              onClick={onClose}
              aria-label="Close modal"
            >
              <CloseIcon /> {/* Use the inline SVG component */}
            </button>
          </div>

          {/* Body Content (Children) */}
          <div className="mt-2 text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;