import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import TemplateEditor from "../../../../components/ui/organisms/TemplateEditor";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import EmailModal from "../molecules/EmailModal";

export default function CreateDesignDocumentUI({
  clientName = "",
  setClientName = () => {},
  loading = false,
  onDownload = () => {},
  onSendEmail = () => {},
  editorValue = "",
  setEditorValue = () => {},
  documentId = "",
  onRegenerateId = () => {},
  docTitle = "",
  setDocTitle = () => {},
  onSave = () => {},
  onBack = () => {},
  isEditing = false, // Track if we're editing existing document
  // Email modal props
  showEmailModal = false,
  emailLoading = false,
  onCloseEmailModal = () => {},
  onSendEmailWithPDF = () => {},
  // Full-screen props
  isFullScreen = false,
  fullScreenRef,
  handleFullScreen,
}) {
  return (
    <div 
      ref={fullScreenRef}
      className={`min-h-screen ${isFullScreen ? 'bg-white dark:bg-slate-900' : 'bg-gray-50 dark:bg-slate-900'}`}
    >
      {/* Header */}
      <div className={`bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 ${isFullScreen ? 'absolute top-0 left-0 right-0 z-50' : ''}`}>
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              {!isFullScreen && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                >
                  <Icon
                    icon={"material-symbols:arrow-back-ios-rounded"}
                    className="text-center"
                  />
                </button>
              )}
              <div className="flex-1 min-w-0 w-full">
                <input
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="Untitled Document"
                  required
                  className="w-full text-lg sm:text-xl font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                />
                {!isFullScreen && (
                  <div className="flex items-center space-x-4 mt-1 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                    <span className="hidden sm:inline">
                      Created on {new Date().toLocaleDateString("en-US")}
                    </span>
                    {documentId && (
                      <span className="flex items-center gap-2 font-mono font-semibold text-primary-default">
                        <Icon icon="mdi:identifier" className="w-4 h-4" />
                        Doc ID: {documentId}
                        {!isEditing && (
                          <button
                            onClick={onRegenerateId}
                            className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition-colors"
                            title="Regenerate Document ID"
                          >
                            <Icon icon="mdi:refresh" className="w-3 h-3" />
                          </button>
                        )}
                        {isEditing && (
                          <span className="ml-1 text-xs text-gray-500 dark:text-slate-500" title="ID cannot be changed when editing">
                            (Fixed)
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleFullScreen}
                className="font-normal text-base w-full sm:w-auto px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon 
                  icon={isFullScreen ? "material-symbols:fullscreen-exit-rounded" : "material-symbols:fullscreen-rounded"} 
                  className="text-xl"
                />
                <span className="hidden sm:inline">
                  {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                </span>
              </button>
              {!isFullScreen && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                  <button
                    onClick={onSave}
                    disabled={loading}
                    className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Icon icon="mdi:content-save" />
                    <span>Save Document</span>
                  </button>
                </div>
              )}
              {/* <button
                onClick={onDownload}
                disabled={loading}
                className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:download" />
                <span>Download</span>
              </button> */}

              {/* <button
                onClick={onSendEmail}
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:email" />
                <span>Send Email</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row ${isFullScreen ? 'h-[calc(100vh-80px)] pt-20' : 'lg:h-[calc(100vh-80px)]'}`}>
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor Content */}
          <div className="flex-1 bg-white dark:bg-slate-800 min-h-0">
            <div className="h-full">
              <TemplateEditor
                editorValue={editorValue}
                setEditorValue={setEditorValue}
                docId={documentId}
                docTitle={docTitle}
              />
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-80 p-4 bg-white dark:bg-slate-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-slate-700 max-h-96 lg:max-h-none overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 my-2">
              Client Name
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>
        </div> */}
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={onCloseEmailModal}
        onSend={onSendEmailWithPDF}
        loading={emailLoading}
        docTitle={docTitle}
        clientName={clientName}
      />
    </div>
  );
}
