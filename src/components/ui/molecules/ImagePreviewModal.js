import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function ImagePreviewModal({ 
  isOpen, 
  onClose, 
  images, // Can be a single image URL or array of image URLs
  title = "Image Preview",
  alt = "Preview Image" 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Normalize images to always be an array
  const imageArray = Array.isArray(images) ? images : [images];
  const currentImage = imageArray[currentImageIndex];
  const hasMultipleImages = imageArray.length > 1;

  const handleNext = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    }
  };

  const handlePrevious = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    }
  };

  const handleClose = () => {
    console.log('Modal close triggered');
    onClose();
  };

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentImageIndex, imageArray.length, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 z-[99999]">
      <div className="relative max-w-5xl max-h-[90vh] w-full mx-4">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
        >
          <Icon icon="heroicons-outline:x-mark" className="w-6 h-6 font-semibold text-red-400" />
        </button>

        {/* Navigation buttons */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
            >
              <Icon icon="heroicons-outline:chevron-left" className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
            >
              <Icon icon="heroicons-outline:chevron-right" className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image container */}
        <div 
          className="bg-white rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{title}</h3>
            {hasMultipleImages && (
              <span className="text-sm text-gray-500">
                {currentImageIndex + 1} of {imageArray.length}
              </span>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={currentImage}
              alt={alt}
              className="w-full h-auto max-h-[70vh] object-contain"
              onError={(e) => {
                e.target.src = "/assets/images/all-img/no-property-img.png";
              }}
            />
          </div>

          {/* Footer with image info */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              {/* <p className="text-sm text-gray-600">
                {hasMultipleImages 
                  ? "Use arrow keys or navigation buttons to browse images" 
                  : "Click outside the image or press the X button to close"
                }
              </p> */}
              {hasMultipleImages && (
                <div className="flex space-x-2">
                  {imageArray.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 z-0" 
        onClick={handleClose}
      />
    </div>
  );
}
