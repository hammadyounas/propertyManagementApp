import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import LoadingUI from "../atoms/LoadingUI";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onDelete,
  text,
  disabled,
  confirmText = "Delete",
  cancelText = "Cancel",
  title = "Confirm Deletion",
  iconColor = "text-red-600",
  buttonColor = "bg-red-600 hover:bg-red-700",
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Prevent backdrop clicks when loading
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !disabled) {
      onClose();
    }
  };

  // Prevent closing when loading
  const handleClose = () => {
    if (!disabled) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-[99999]"
      onClick={handleBackdropClick}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative' }}
      >
        {disabled && (
          <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center z-10">
            {/* <LoadingUI /> */}
          </div>
        )}
        <div className="flex items-center space-x-3">
          <ExclamationTriangleIcon className={`h-8 w-8 ${iconColor}`} />
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 mt-2">
          {text || "Are you sure you want to delete this item?"}
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            disabled={disabled}
            className={`px-4 py-2 rounded-md transition ${
              disabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={handleClose}
          >
            {cancelText}
          </button>
          <button
            disabled={disabled}
            className={`px-4 py-2 ${buttonColor} text-white rounded-md transition ${
              disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90'
            }`}
            onClick={onDelete}
          >
            {disabled ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {confirmText}...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
