import { useState, useEffect, useCallback } from 'react';

/**
 * Full-screen utility helper
 * Provides cross-browser full-screen functionality
 */

/**
 * Request full-screen mode for an element
 * @param {HTMLElement} element - The element to make full-screen
 */
export const enterFullScreen = (element) => {
  if (!element) return;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }
};

/**
 * Exit full-screen mode
 */
export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // Chrome, Safari, Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // IE/Edge
    document.msExitFullscreen();
  }
};

/**
 * Toggle full-screen mode
 * @param {HTMLElement} element - The element to toggle full-screen for
 * @param {boolean} isFullScreen - Current full-screen state
 */
export const toggleFullScreen = (element, isFullScreen) => {
  if (isFullScreen) {
    exitFullScreen();
  } else {
    enterFullScreen(element);
  }
};

/**
 * Check if currently in full-screen mode
 * @returns {boolean}
 */
export const isFullScreenActive = () => {
  return !!(
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};

/**
 * Get the current full-screen element
 * @returns {HTMLElement|null}
 */
export const getFullScreenElement = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    null
  );
};

/**
 * Add full-screen change event listener (cross-browser)
 * @param {Function} callback - Function to call when full-screen state changes
 * @returns {Function} - Cleanup function to remove listeners
 */
export const addFullScreenChangeListener = (callback) => {
  const handleChange = () => {
    const isFullScreen = isFullScreenActive();
    callback(isFullScreen);
  };

  // Add listeners for all browsers
  document.addEventListener('fullscreenchange', handleChange);
  document.addEventListener('mozfullscreenchange', handleChange);
  document.addEventListener('webkitfullscreenchange', handleChange);
  document.addEventListener('MSFullscreenChange', handleChange);

  // Return cleanup function
  return () => {
    document.removeEventListener('fullscreenchange', handleChange);
    document.removeEventListener('mozfullscreenchange', handleChange);
    document.removeEventListener('webkitfullscreenchange', handleChange);
    document.removeEventListener('MSFullscreenChange', handleChange);
  };
};

/**
 * Hook for full-screen functionality (React hook)
 * @param {React.RefObject} elementRef - Ref to the element to make full-screen
 * @returns {Object} - { isFullScreen, toggleFullScreen }
 */
export const useFullScreen = (elementRef) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Set up listener for full-screen changes
    const cleanup = addFullScreenChangeListener(setIsFullScreen);
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  const handleToggle = useCallback(() => {
    if (elementRef.current) {
      toggleFullScreen(elementRef.current, isFullScreen);
    }
  }, [elementRef, isFullScreen]);

  return {
    isFullScreen,
    toggleFullScreen: handleToggle,
  };
};

