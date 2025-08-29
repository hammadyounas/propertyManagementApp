import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'property_form_autosave';
const SAVE_DEBOUNCE_MS = 2000; // Save 2 seconds after user stops typing
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

export const useAutoSave = (formData, inputType = 'manual') => {
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const saveTimeoutRef = useRef(null);
  const lastFormDataRef = useRef(null);

  // Check if localStorage is available
  const isLocalStorageAvailable = useCallback(() => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  // Get storage size in bytes
  const getStorageSize = useCallback(() => {
    if (!isLocalStorageAvailable()) return 0;
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }, [isLocalStorageAvailable]);

  // Clean old auto-save data if storage is getting full
  const cleanupOldSaves = useCallback(() => {
    if (!isLocalStorageAvailable()) return;
    
    const currentSize = getStorageSize();
    if (currentSize > MAX_STORAGE_SIZE * 0.8) { // Clean when 80% full
      // Remove old auto-save entries (keep only the latest 3)
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(STORAGE_KEY) && key !== STORAGE_KEY
      );
      
      if (keys.length > 3) {
        keys.sort().slice(0, keys.length - 3).forEach(key => {
          localStorage.removeItem(key);
        });
      }
    }
  }, [isLocalStorageAvailable, getStorageSize]);

  // Save form data to localStorage
  const saveToStorage = useCallback((data, timestamp = Date.now()) => {
    if (!isLocalStorageAvailable() || !autoSaveEnabled) return false;

    try {
      cleanupOldSaves();
      
      const saveData = {
        formData: data,
        timestamp,
        inputType,
        version: '1.0'
      };

      const serializedData = JSON.stringify(saveData);
      
      // Check if data is too large
      if (serializedData.length > MAX_STORAGE_SIZE) {
        console.warn('Auto-save data too large, skipping save');
        return false;
      }

      localStorage.setItem(STORAGE_KEY, serializedData);
      setLastSaved(new Date(timestamp));
      setHasUnsavedChanges(false);
      
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }, [isLocalStorageAvailable, autoSaveEnabled, cleanupOldSaves, inputType]);

  // Load form data from localStorage
  const loadFromStorage = useCallback(() => {
    if (!isLocalStorageAvailable()) return null;

    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return null;

      const parsed = JSON.parse(savedData);
      
      // Validate the saved data structure
      if (!parsed.formData || !parsed.timestamp) {
        console.warn('Invalid auto-save data structure');
        return null;
      }

      // Check if data is not too old (7 days)
      const daysSinceSave = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24);
      if (daysSinceSave > 7) {
        console.warn('Auto-save data is too old, removing');
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      setLastSaved(new Date(parsed.timestamp));
      return parsed.formData;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }, [isLocalStorageAvailable]);

  // Clear auto-save data
  const clearAutoSave = useCallback(() => {
    if (!isLocalStorageAvailable()) return;
    
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to clear auto-save data:', error);
    }
  }, [isLocalStorageAvailable]);

  // Debounced save function
  const debouncedSave = useCallback((data) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      const success = saveToStorage(data);
      setIsSaving(false);
      
      if (success) {
        // Show subtle notification (only if user has been typing for a while)
        const timeSinceLastSave = lastSaved ? Date.now() - lastSaved.getTime() : Infinity;
        if (timeSinceLastSave > 30000) { // Only show if last save was > 30 seconds ago
          toast.info('Form auto-saved', { 
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
        }
      }
    }, SAVE_DEBOUNCE_MS);
  }, [saveToStorage, lastSaved]);

  // Check if form data has changed
  const hasFormDataChanged = useCallback((currentData, previousData) => {
    if (!previousData) return Object.keys(currentData).length > 0;
    
    return JSON.stringify(currentData) !== JSON.stringify(previousData);
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (!autoSaveEnabled || inputType === 'csv') return;

    const hasChanged = hasFormDataChanged(formData, lastFormDataRef.current);
    
    if (hasChanged) {
      setHasUnsavedChanges(true);
      lastFormDataRef.current = formData;
      debouncedSave(formData);
    }
  }, [formData, autoSaveEnabled, inputType, hasFormDataChanged, debouncedSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Manual save function
  const manualSave = useCallback(() => {
    setIsSaving(true);
    const success = saveToStorage(formData);
    setIsSaving(false);
    
    if (success) {
      toast.success('Form saved successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } else {
      toast.error('Failed to save form', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
    
    return success;
  }, [formData, saveToStorage]);

  // Get auto-save status
  const getAutoSaveStatus = useCallback(() => {
    if (!isLocalStorageAvailable()) {
      return {
        available: false,
        message: 'Local storage not available'
      };
    }

    if (!autoSaveEnabled) {
      return {
        available: true,
        enabled: false,
        message: 'Auto-save disabled'
      };
    }

    if (isSaving) {
      return {
        available: true,
        enabled: true,
        saving: true,
        message: 'Saving...'
      };
    }

    if (hasUnsavedChanges) {
      return {
        available: true,
        enabled: true,
        hasChanges: true,
        message: 'Unsaved changes'
      };
    }

    if (lastSaved) {
      const timeAgo = Date.now() - lastSaved.getTime();
      const minutesAgo = Math.floor(timeAgo / (1000 * 60));
      
      if (minutesAgo < 1) {
        return {
          available: true,
          enabled: true,
          saved: true,
          message: 'Saved just now'
        };
      } else if (minutesAgo < 60) {
        return {
          available: true,
          enabled: true,
          saved: true,
          message: `Saved ${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`
        };
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        return {
          available: true,
          enabled: true,
          saved: true,
          message: `Saved ${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`
        };
      }
    }

    return {
      available: true,
      enabled: true,
      message: 'Ready to save'
    };
  }, [isLocalStorageAvailable, autoSaveEnabled, isSaving, hasUnsavedChanges, lastSaved]);

  return {
    // State
    lastSaved,
    isSaving,
    hasUnsavedChanges,
    autoSaveEnabled,
    
    // Actions
    saveToStorage: manualSave,
    loadFromStorage,
    clearAutoSave,
    setAutoSaveEnabled,
    
    // Status
    getAutoSaveStatus,
    isLocalStorageAvailable: isLocalStorageAvailable(),
  };
};
