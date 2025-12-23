import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Modal from '../../../../components/combined/organisms/ModalUIContainer';
import Button from '../../../../components/ui/molecules/Button';
import { toast } from 'react-toastify';

export default function SaveOnlyModal({
  isOpen,
  onClose,
  onSave,
  loading = false,
  docTitle = '',
}) {
  const [pdfFile, setPdfFile] = useState(null);

  // Reset fields when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPdfFile(null);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!pdfFile) {
      toast.error('Please select a PDF file to upload');
      return;
    }

    // Validate file type
    if (pdfFile.type !== 'application/pdf') {
      toast.error('Please select a valid PDF file');
      return;
    }

    // Validate file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (pdfFile.size > maxSize) {
      toast.error(`File size is too large. Maximum size is 10MB. Your file is ${(pdfFile.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }
    
    // Save with PDF file
    onSave({
      pdfFile: pdfFile,
    });
  };

  const handleClose = () => {
    setPdfFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      
      // Check file size (limit to 10MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error(`File size is too large. Maximum size is 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        e.target.value = ''; // Clear the input
        return;
      }
      
      setPdfFile(file);
    }
  };

  return (
    <Modal
      title="Save Document"
      label=""
      activeModal={isOpen}
      onClose={handleClose}
      centered
      size="lg"
      footerContent={
        <div className="flex justify-end space-x-3">
          <Button
            text="Cancel"
            className="btn-outline-dark"
            onClick={handleClose}
            disabled={loading}
          />
          <Button
            text={loading ? "Saving..." : "Save"}
            className="btn-primary bg-primary-default"
            onClick={handleSave}
            disabled={loading || !pdfFile}
          />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Document Info */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3">
            <Icon 
              icon="mdi:file-document" 
              className="text-2xl text-blue-600 dark:text-blue-400"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                {docTitle || 'Untitled Document'}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Please export your document as PDF first, then upload it here
              </p>
            </div>
          </div>
        </div>

        {/* PDF File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
            Upload PDF File *
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-default focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-default file:text-white hover:file:bg-yellow-500 cursor-pointer"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
            Select the PDF file you exported from the editor (use "Export to PDF" button first)
          </p>
          {pdfFile && (
            <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Icon icon="mdi:check-circle" />
              <span>Selected: {pdfFile.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-start space-x-3">
            <Icon icon="mdi:information-outline" className="text-gray-600 dark:text-gray-400 mt-0.5 text-xl" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-2">What will be saved:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="text-gray-600 dark:text-gray-400" />
                  <span><strong>Document:</strong> {docTitle || 'Untitled Document'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="text-gray-600 dark:text-gray-400" />
                  <span><strong>Format:</strong> PDF Upload</span>
                </li>
              </ul>
              <p className="mt-3 text-xs italic">
                When you click "Save", the system will:
              </p>
              <ol className="mt-2 space-y-1 text-xs list-decimal list-inside">
                <li>Upload PDF to Cloudinary</li>
                <li>Save document data and public URL to database</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

