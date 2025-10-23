import React from 'react';
import { Icon } from '@iconify/react';
import { CustomSelect } from '../../../../components/ui/molecules/CustomSelect';
import Button from '../../../../components/ui/molecules/Button';

export default function TemplateSelectionModal({
  isOpen = false,
  onClose = () => {},
  templates = [],
  selectedTemplateId = "",
  setSelectedTemplateId = () => {},
  onCreateDocument = () => {},
  loading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            Create New Document
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Icon icon="heroicons:x-mark" className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <CustomSelect
            label="Select Template"
            placeholder="-- Choose a template --"
            value={selectedTemplateId}
            onChange={setSelectedTemplateId}
            options={templates.map((t) => ({
              value: t._id || t.id,
              label: t.title || "Untitled",
            }))}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            text="Cancel"
            onClick={onClose}
            className="btn-secondary"
          />
          <Button
            text="Create Document"
            onClick={() => onCreateDocument(selectedTemplateId)}
            disabled={!selectedTemplateId || loading}
            className="btn-primary bg-primary-default disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
