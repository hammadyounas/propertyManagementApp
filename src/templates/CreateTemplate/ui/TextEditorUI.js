"use client";
import Button from "../../../components/ui/molecules/Button";
import TemplateEditor from "../../../components/ui/organisms/TemplateEditor";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function TemplateEditorUI({
  title,
  editorValue,
  setEditorValue,
  setTitle,
  loading,
  onSave,
  onBack,
  isEdit = false,
  templateId = null,
  fileInputRef,
  handleImportFile,
  showImportModal,
  setShowImportModal,
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleBrowseClick,
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
                 <Icon icon={"material-symbols:arrow-back-ios-rounded"} className="text-center"/>
                </button>
              )}
              <div className="flex-1 min-w-0 w-full">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Untitled Document"
                  className="w-full text-lg sm:text-xl font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                />
                {!isFullScreen && (
                  <div className="flex items-center space-x-4 mt-1 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                    <span className="hidden sm:inline">
                      Created on {new Date().toLocaleDateString("en-US")}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Admin</span>
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
                    onClick={() => {
                      const templateData = {
                        title,
                        content: editorValue,
                      };
                      if (onSave) {
                        onSave(templateData);
                      } else {
                        console.log("Saving:", templateData);
                      }
                    }}
                    disabled={loading}
                    className="w-full sm:w-auto px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span className="hidden sm:inline">{loading ? "Saving Template..." : "Save as Template"}</span>
                    <span className="sm:hidden">{loading ? "Saving..." : "Save"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row ${isFullScreen ? 'h-[calc(100vh-80px)] pt-20' : 'lg:h-[calc(100vh-80px)]'}`}>
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor Content */}
          <div className="flex-1 bg-white dark:bg-slate-800 min-h-0">
            <div className="h-full">
              <TemplateEditor
                editorValue={editorValue}
                setEditorValue={setEditorValue}
              />
            </div>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx,.html,.htm,.txt"
        style={{ display: "none" }}
        onChange={handleImportFile}
      />

      {/* Import Modal with Drag & Drop */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  Import Document
                </h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-slate-600 hover:border-blue-400'
                }`}
              >
                <Icon
                  icon="mdi:file-document-outline"
                  className="w-16 h-16 mx-auto text-gray-400 dark:text-slate-500 mb-4"
                />
                <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">
                  {isDragging ? 'Drop file here' : 'Drag & drop your file here'}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">or</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Files
                </button>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">
                  Supported formats: .docx, .html, .txt
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional styles for better media display */}
      <style jsx global>{`
        .ql-editor video {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 10px 0;
        }

        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 10px 0;
        }

        /* Preview panel styles */
        .prose video {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 4px;
          margin: 10px 0;
        }

        .prose img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 4px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
