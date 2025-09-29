"use client";
import Image from "next/image";
import Card from "../../../components/ui/molecules/CardUI";
import TemplateEditor from "../../../components/ui/organisms/TemplateEditor";
import { CustomSelect } from "../../../components/ui/molecules/CustomSelect";
import { useState } from "react";

export default function TemplateEditorUI({
  title,
  editorValue,
  setEditorValue,
  setTitle,
  category,
  setCategory,
  loading,
  onSave,
  onBack,
  isEdit = false, 
  templateId = null,
}) {
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);

  // Category options for the dropdown
  const categoryOptions = [
    { value: 'uncategorized', label: 'Template' },
    { value: 'email', label: 'Email' },
    { value: 'contract', label: 'Contract' },
    { value: 'listing', label: 'Listing' },
    { value: 'marketing', label: 'Marketing' },
  ];

  // Predefined placeholders for property management
  const placeholders = [
    { key: '{{client_name}}', label: 'Client Name', description: 'Full name of the client' },
    { key: '{{property_address}}', label: 'Property Address', description: 'Complete property address' },
    { key: '{{property_type}}', label: 'Property Type', description: 'Type of property (house, apartment, etc.)' },
    { key: '{{property_price}}', label: 'Property Price', description: 'Price of the property' },
    { key: '{{agent_name}}', label: 'Agent Name', description: 'Name of the real estate agent' },
    { key: '{{agent_phone}}', label: 'Agent Phone', description: 'Agent contact phone number' },
    { key: '{{agent_email}}', label: 'Agent Email', description: 'Agent email address' },
    { key: '{{company_name}}', label: 'Company Name', description: 'Real estate company name' },
    { key: '{{listing_date}}', label: 'Listing Date', description: 'Date when property was listed' },
    { key: '{{closing_date}}', label: 'Closing Date', description: 'Expected closing date' },
    { key: '{{commission_rate}}', label: 'Commission Rate', description: 'Commission percentage' },
    { key: '{{property_features}}', label: 'Property Features', description: 'Key features of the property' },
    { key: '{{viewing_schedule}}', label: 'Viewing Schedule', description: 'Available viewing times' },
    { key: '{{mortgage_info}}', label: 'Mortgage Information', description: 'Mortgage details and requirements' },
    { key: '{{legal_notes}}', label: 'Legal Notes', description: 'Important legal information' },
  ];

  const insertPlaceholder = (placeholder) => {
    // Get the current editor content and add the placeholder
    const currentContent = editorValue;
    const newContent = currentContent + placeholder;
    setEditorValue(newContent);
    setShowPlaceholders(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Untitled Document"
                  className="text-xl font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                />
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-slate-400">
                  <span>Created on {new Date().toLocaleDateString('en-US')}</span>
                  <span>•</span>
                  <span>Admin</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-48">
                <CustomSelect
                  value={category}
                  onChange={setCategory}
                  options={categoryOptions}
                  placeholder="Select Category"
                  className="text-sm"
                />
              </div>
              <button
                onClick={() => {
                  const templateData = { title, content: editorValue, id: templateId };
                  if (onSave) {
                    onSave(templateData);
                  } else {
                    console.log("Saving:", templateData);
                    alert("Template saved! (check console)");
                  }
                }}
                disabled={loading}
                className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>Save as Template</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Toolbar */}
          {/* <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-sm text-gray-600 dark:text-slate-400">Heading 3</span>
              </div>
            </div>
          </div> */}

          {/* Editor Content */}
          <div className="flex-1 bg-white dark:bg-slate-800">
            <div className="h-full">
              <TemplateEditor
                editorValue={editorValue}
                setEditorValue={setEditorValue}
              />
            </div>
          </div>
        </div>

        {/* Variables Sidebar */}
        <div className="w-80 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Variables</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              You can use this predefined variables to create your template.
            </p>
          </div>
          
          <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Personal Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">
                Personal Information
              </h4>
              <div className="space-y-2">
                {placeholders.slice(0, 8).map((placeholder, index) => (
                  <div
                    key={index}
                    onClick={() => insertPlaceholder(placeholder.key)}
                    className="p-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                      {placeholder.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      {placeholder.key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">
                Contract Information
              </h4>
              <div className="space-y-2">
                {placeholders.slice(8, 12).map((placeholder, index) => (
                  <div
                    key={index}
                    onClick={() => insertPlaceholder(placeholder.key)}
                    className="p-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                      {placeholder.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      {placeholder.key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">
                Property Information
              </h4>
              <div className="space-y-2">
                {placeholders.slice(12).map((placeholder, index) => (
                  <div
                    key={index}
                    onClick={() => insertPlaceholder(placeholder.key)}
                    className="p-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                      {placeholder.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      {placeholder.key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
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