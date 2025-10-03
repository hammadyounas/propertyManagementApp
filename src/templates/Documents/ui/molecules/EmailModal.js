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
}) {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Set default subject when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSubject(`Document: ${docTitle || 'Untitled Document'}`);
      setMessage(`Dear ${clientName || 'Client'},\n\nPlease find attached the document you requested.\n\nBest regards,\nProperty Management Team`);
    }
  }, [isOpen, docTitle, clientName]);

  const handleSend = () => {
    if (!email.trim()) {
      toast.error('Please enter recipient email address');
      return;
    }
    if (!subject.trim()) {
      toast.error('Please enter email subject');
      return;
    }
    
    onSend({
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
  };

  const handleClose = () => {
    setEmail('');
    setSubject('');
    setMessage('');
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
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon icon="mdi:file-document" className="text-2xl text-primary-default" />
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                {docTitle || 'Untitled Document'}
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Will be sent as PDF attachment
              </p>
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter recipient email address"
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-default focus:border-transparent"
              required
            />
          </div>

          {/* Email Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-default focus:border-transparent"
              required
            />
          </div>

          {/* Email Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={4}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-default focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Preview Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon icon="mdi:information" className="text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">Email Preview:</p>
              <p><strong>To:</strong> {email || 'Recipient email'}</p>
              <p><strong>Subject:</strong> {subject || 'Email subject'}</p>
              <p><strong>Attachment:</strong> {docTitle || 'Document'}.pdf</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
