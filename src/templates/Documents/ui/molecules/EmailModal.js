import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Modal from '../../../../components/combined/organisms/ModalUIContainer';
import Button from '../../../../components/ui/molecules/Button';
import { toast } from 'react-toastify';

export default function EmailModal({
  isOpen,
  onClose,
  onSend,
  loading = false,
  docTitle = '',
  clientName = '',
  hasPdf = false,
  defaultEmail = '',
}) {
  const [email, setEmail] = useState('');

  // Reset email field when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEmail(defaultEmail || '');
    }
  }, [isOpen, defaultEmail]);

  const handleSend = () => {
    if (!email.trim()) {
      toast.error('Please enter recipient email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Send as email_recipient to match backend field
    onSend({
      email_recipient: email.trim(),
    });
  };

  const handleClose = () => {
    setEmail('');
    onClose();
  };

  return (
    <Modal
      title="Send Document via Email"
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
            text={loading ? "Sending..." : "Send Email"}
            className="btn-primary bg-primary-default"
            onClick={handleSend}
            disabled={loading}
          />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Document Info */}
        <div className={`p-4 rounded-lg ${
          hasPdf 
            ? 'bg-green-50 dark:bg-green-900/20' 
            : 'bg-yellow-50 dark:bg-yellow-900/20'
        }`}>
          <div className="flex items-center space-x-3">
            <Icon 
              icon={hasPdf ? "mdi:file-pdf-box" : "mdi:file-document-alert"} 
              className={`text-2xl ${
                hasPdf 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}
            />
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                {docTitle || 'Untitled Document'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {hasPdf ? (
                  <>
                    <Icon icon="mdi:check-circle" className="text-green-600 dark:text-green-400" />
                    <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                      PDF attached and ready to send
                    </p>
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:alert-circle" className="text-yellow-600 dark:text-yellow-400" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      No PDF uploaded - Please upload PDF first
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Email Form */}
        <div className="space-y-4">
          {/* Recipient Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              Recipient Email *
            </label>
            <div className="relative">
              <Icon 
                icon="mdi:email" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full border border-gray-300 dark:border-slate-600 rounded-lg pl-10 pr-3 py-2.5 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-default focus:border-transparent"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
              Enter the email address where you want to send this document
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-start space-x-3">
            <Icon icon="mdi:information-outline" className="text-gray-600 dark:text-gray-400 mt-0.5 text-xl" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-2">What will be sent:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="text-gray-600 dark:text-gray-400" />
                  <span><strong>To:</strong> {email || 'recipient@example.com'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="text-gray-600 dark:text-gray-400" />
                  <span><strong>Document:</strong> {docTitle || 'Untitled Document'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="text-gray-600 dark:text-gray-400" />
                  <span><strong>Format:</strong> PDF Attachment</span>
                </li>
              </ul>
              <p className="mt-3 text-xs italic">
                Subject and message will be auto-generated by the system
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
