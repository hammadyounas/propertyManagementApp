import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Icon from "@/components/ui/atoms/Icon";
import moment from "moment/moment";

const BannerUI = ({ title, address, updatedAt, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Default image if no images provided
  const defaultImage = "/assets/images/all-img/no-property-img.png";
  const imageList = images && images.length > 0 ? images : [defaultImage];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || imageList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, imageList.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? imageList.length - 1 : currentImageIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      currentImageIndex === imageList.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div className="relative">
      {/* Main Image Slider */}
      <div className="relative bg-black-500 w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-none">
        {/* Main Image */}
        <div className="relative w-full h-full rounded-none">
          <img
            src={imageList[currentImageIndex]}
            alt={`Property image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain transition-all duration-500 ease-in-out rounded-none"
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Navigation Arrows */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {imageList.length > 1 && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {imageList.length}
            </div>
          )}

          {/* Control Buttons */}
          {imageList.length > 1 && (
            <div className="absolute bottom-4 right-4">
              <button
                onClick={toggleAutoPlay}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  isAutoPlay 
                    ? 'bg-primary-default text-white' 
                    : 'bg-white bg-opacity-80 text-gray-800 hover:bg-opacity-100'
                }`}
                aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
              >
                {isAutoPlay ? 'Pause' : 'Play'}
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {imageList.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {imageList.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'bg-white scale-125'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {imageList.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary-default ring-2 ring-primary-default'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerUI;
