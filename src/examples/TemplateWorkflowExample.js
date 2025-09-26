"use client"

import { useState, useEffect } from "react"
import TemplateEditor from "../components/ui/organisms/TemplateEditor"
import TemplateRenderer from "../components/ui/organisms/TemplateRenderer"

// Example component showing the complete workflow
const TemplateWorkflowExample = () => {
  const [currentStep, setCurrentStep] = useState('create'); // 'create', 'save', 'use'
  const [editorValue, setEditorValue] = useState("");
  const [templateData, setTemplateData] = useState(null);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Simulate loading saved templates from database
  useEffect(() => {
    // In a real app, this would fetch from your API/database
    const mockTemplates = [
      {
        id: 1,
        name: "Lease Agreement",
        content: "<h2>Rental Lease Agreement</h2><p>This lease agreement is between <strong>{{landlord_name}}</strong> and <strong>{{tenant_name}}</strong> for the property located at <strong>{{property_address}}</strong>.</p><h3>Terms:</h3><ul><li>Monthly Rent: {{rent_amount}}</li><li>Lease Start: {{lease_start}}</li><li>Lease End: {{lease_end}}</li><li>Security Deposit: {{security_deposit}}</li></ul><p>Rent is due on the {{due_date}} of each month.</p><p>Signed on {{current_date}}.</p>",
        placeholders: [
          { key: "{{landlord_name}}", label: "Landlord Name", required: true, type: "text" },
          { key: "{{tenant_name}}", label: "Tenant Name", required: true, type: "text" },
          { key: "{{property_address}}", label: "Property Address", required: true, type: "textarea" },
          { key: "{{rent_amount}}", label: "Rent Amount", required: true, type: "text" },
          { key: "{{lease_start}}", label: "Lease Start Date", required: true, type: "date" },
          { key: "{{lease_end}}", label: "Lease End Date", required: true, type: "date" },
          { key: "{{security_deposit}}", label: "Security Deposit", required: true, type: "text" },
          { key: "{{due_date}}", label: "Due Date", required: true, type: "text" },
          { key: "{{current_date}}", label: "Current Date", required: false, type: "date" }
        ],
        createdAt: "2024-01-15T10:30:00Z"
      }
    ];
    setSavedTemplates(mockTemplates);
  }, []);

  // Handle template data changes from editor
  const handleTemplateDataChange = (data) => {
    setTemplateData(data);
  };

  // Save template (simulate API call)
  const handleSaveTemplate = async (templateName) => {
    if (!templateData || !templateName) return;

    try {
      // In a real app, this would be an API call
      const newTemplate = {
        id: Date.now(),
        name: templateName,
        ...templateData
      };

      setSavedTemplates(prev => [...prev, newTemplate]);
      alert('Template saved successfully!');
      setCurrentStep('use');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template');
    }
  };

  // Handle document generation
  const handleDocumentGeneration = async (generatedData) => {
    try {
      // In a real app, you would:
      // 1. Save the generated document to database
      // 2. Generate PDF/Word document
      // 3. Send notifications
      // 4. Create audit trail
      
      console.log('Generated Document Data:', generatedData);
      alert('Document generated successfully!');
      
      // Example: You could save to database like this:
      // const savedDoc = await fetch('/api/documents', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     templateId: selectedTemplate.id,
      //     content: generatedData.content,
      //     placeholderValues: generatedData.placeholderValues,
      //     generatedAt: generatedData.generatedAt
      //   })
      // });
      
    } catch (error) {
      console.error('Error processing generated document:', error);
      alert('Error processing document');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setCurrentStep('create')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              currentStep === 'create'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            1. Create Template
          </button>
          <button
            onClick={() => setCurrentStep('save')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              currentStep === 'save'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            2. Save Template
          </button>
          <button
            onClick={() => setCurrentStep('use')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              currentStep === 'use'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            3. Use Template
          </button>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'create' && (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-200 mb-3">
              Step 1: Create Your Template
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
              Use the editor below to create your document template. Click the "Placeholders" button to add dynamic fields that can be filled in later.
            </p>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-md p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                💡 <strong>Tip:</strong> Add placeholders like {{tenant_name}}, {{property_address}}, etc. that will be filled in when using the template.
              </p>
            </div>
          </div>

          <TemplateEditor
            label="Template Content"
            placeholder="Start creating your template..."
            editorValue={editorValue}
            setEditorValue={setEditorValue}
            onTemplateDataChange={handleTemplateDataChange}
          />

          {templateData && templateData.placeholders.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Detected Placeholders:
              </h4>
              <div className="flex flex-wrap gap-2">
                {templateData.placeholders.map((placeholder, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-md text-sm"
                  >
                    {placeholder.key}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setCurrentStep('save')}
            disabled={!templateData || !editorValue}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Continue to Save Template →
          </button>
        </div>
      )}

      {currentStep === 'save' && (
        <div className="space-y-6">
          <div className="bg-green-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-200 mb-3">
              Step 2: Save Your Template
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              Give your template a name and save it for future use.
            </p>
          </div>

          {templateData && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  id="templateName"
                  placeholder="e.g., Lease Agreement Template"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200"
                />
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-slate-200 mb-2">
                  Template Summary:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                  <li>• <strong>{templateData.placeholders.length}</strong> placeholders detected</li>
                  <li>• Content length: <strong>{templateData.content.length}</strong> characters</li>
                  <li>• Created: <strong>{new Date(templateData.createdAt).toLocaleDateString()}</strong></li>
                </ul>
              </div>

              <button
                onClick={() => {
                  const name = document.getElementById('templateName').value;
                  if (name) {
                    handleSaveTemplate(name);
                  } else {
                    alert('Please enter a template name');
                  }
                }}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Save Template
              </button>
            </div>
          )}
        </div>
      )}

      {currentStep === 'use' && (
        <div className="space-y-6">
          <div className="bg-purple-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-200 mb-3">
              Step 3: Use Your Template
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              Select a saved template and fill in the placeholder values to generate a document.
            </p>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              Select Template
            </label>
            <select
              value={selectedTemplate?.id || ''}
              onChange={(e) => {
                const template = savedTemplates.find(t => t.id === parseInt(e.target.value));
                setSelectedTemplate(template);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200"
            >
              <option value="">Choose a template...</option>
              {savedTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.placeholders.length} placeholders)
                </option>
              ))}
            </select>
          </div>

          {/* Template Renderer */}
          {selectedTemplate && (
            <TemplateRenderer
              template={selectedTemplate}
              onGenerate={handleDocumentGeneration}
              initialValues={{
                "{{current_date}}": new Date().toISOString().split('T')[0]
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateWorkflowExample;
