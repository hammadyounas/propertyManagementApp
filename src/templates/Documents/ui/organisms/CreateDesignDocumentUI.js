import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CustomSelect } from "../../../../components/ui/molecules/CustomSelect";
import TemplateEditor from "../../../../components/ui/organisms/TemplateEditor";
import Card from "../../../../components/combined/molecules/CardUIContainer";

export default function CreateDesignDocumentUI({
  templates = [],
  selectedTemplateId = "",
  setSelectedTemplateId = () => {},
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
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
              >
                <Icon
                  icon={"material-symbols:arrow-back-ios-rounded"}
                  className="text-center"
                />
              </button>
              <div className="flex-1 min-w-0 w-full">
                <input
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="Untitled Document"
                  className="w-full text-lg sm:text-xl font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                />
                <div className="flex items-center space-x-4 mt-1 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                  <span className="hidden sm:inline">
                    Created on {new Date().toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <button
                onClick={onSave}
                disabled={loading}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:content-save" />
                <span>Save</span>
              </button>
              <button
                onClick={onDownload}
                disabled={loading}
                className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:download" />
                <span>Download</span>
              </button>

              <button
                onClick={onSendEmail}
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:email" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-80px)]">
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
        <div className="w-full lg:w-80 p-4 bg-white dark:bg-slate-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-slate-700 max-h-96 lg:max-h-none overflow-y-auto">
          <div>
            <CustomSelect
              label="Select Template"
              placeholder="-- Select a template --"
              value={selectedTemplateId}
              onChange={setSelectedTemplateId}
              options={templates.map((t) => ({
                value: t.id,
                label: t.title || "Untitled",
              }))}
            />
          </div>

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
        </div>
      </div>
    </div>
  );
}
