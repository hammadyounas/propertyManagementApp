import React from 'react';
import { Save, Clock, AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

export const AutoSaveStatus = ({ 
  status, 
  onManualSave, 
  onToggleAutoSave, 
  onRestoreData,
  hasRestoreData = false 
}) => {
  const getStatusIcon = () => {
    if (!status.available) {
      return <WifiOff className="h-4 w-4 text-red-500" />;
    }
    
    if (status.saving) {
      return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />;
    }
    
    if (status.saved) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    if (status.hasChanges) {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
    
    return <Wifi className="h-4 w-4 text-gray-400" />;
  };

  const getStatusColor = () => {
    if (!status.available) return 'text-red-600';
    if (status.saving) return 'text-blue-600';
    if (status.saved) return 'text-green-600';
    if (status.hasChanges) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (!status.available) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <WifiOff className="h-4 w-4 text-red-500" />
        <span className="text-red-600">Auto-save unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Status indicator */}
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`text-sm ${getStatusColor()}`}>
          {status.message}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-2">
        {/* Manual save button */}
        <button
          onClick={onManualSave}
          disabled={status.saving}
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Save form data manually"
        >
          <Save className="h-3 w-3" />
          <span>Save</span>
        </button>

        {/* Auto-save toggle */}
        <button
          onClick={onToggleAutoSave}
          className={`flex items-center space-x-1 px-2 py-1 text-xs rounded transition-colors ${
            status.enabled
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={status.enabled ? 'Disable auto-save' : 'Enable auto-save'}
        >
          <div className={`h-2 w-2 rounded-full ${status.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span>Auto</span>
        </button>

        {/* Restore data button */}
        {hasRestoreData && (
          <button
            onClick={onRestoreData}
            className="flex items-center space-x-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
            title="Restore previously saved data"
          >
            <AlertCircle className="h-3 w-3" />
            <span>Restore</span>
          </button>
        )}
      </div>
    </div>
  );
};
