"use client"

import { useState, useEffect } from "react"

const TemplateRenderer = ({
  template, // Template object with content and placeholders
  onGenerate, // Callback when document is generated
  className = "",
  readOnly = false,
  initialValues = {},
}) => {
  const [placeholderValues, setPlaceholderValues] = useState(initialValues);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize placeholder values
  useEffect(() => {
    if (template && template.placeholders) {
      const defaultValues = {};
      template.placeholders.forEach(placeholder => {
        defaultValues[placeholder.key] = initialValues[placeholder.key] || "";
      });
      setPlaceholderValues(defaultValues);
    }
  }, [template, initialValues]);

  // Function to render content with placeholder values
  const renderContentWithValues = (content, values) => {
    let renderedContent = content;
    
    Object.entries(values).forEach(([key, value]) => {
      const regex = new RegExp(key.replace(/[{}]/g, '\\$&'), 'g');
      renderedContent = renderedContent.replace(regex, value || `<span style="background-color: #fee; color: #c00; padding: 2px 4px; border-radius: 2px;">${key}</span>`);
    });
    
    return renderedContent;
  };

  // Handle input changes
  const handleInputChange = (placeholderKey, value) => {
    setPlaceholderValues(prev => ({
      ...prev,
      [placeholderKey]: value
    }));
  };

  // Generate final document
  const handleGenerate = async () => {
    if (!template) return;

    setIsGenerating(true);
    
    try {
      const finalContent = renderContentWithValues(template.content, placeholderValues);
      setGeneratedContent(finalContent);
      
      if (onGenerate) {
        await onGenerate({
          content: finalContent,
          placeholderValues: placeholderValues,
          template: template,
          generatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if all required placeholders are filled
  const isFormValid = () => {
    if (!template || !template.placeholders) return false;
    
    return template.placeholders.every(placeholder => {
      if (!placeholder.required) return true;
      return placeholderValues[placeholder.key]?.trim() !== "";
    });
  };

  // Get preview content
  const getPreviewContent = () => {
    if (!template) return "";
    return renderContentWithValues(template.content, placeholderValues);
  };

  if (!template) {
    return (
      <div className={`template-renderer ${className}`}>
        <div className="text-center py-8 text-gray-500 dark:text-slate-400">
          No template selected
        </div>
      </div>
    );
  }

  return (
    <div className={`template-renderer ${className}`}>
      <div className="space-y-6">
        {/* Template Info */}
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200 mb-2">
            Fill Template Placeholders
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Enter values for the placeholders below to generate your document.
          </p>
        </div>

        {/* Placeholder Form */}
        {template.placeholders && template.placeholders.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-slate-200">
              Required Information:
            </h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              {template.placeholders.map((placeholder) => (
                <div key={placeholder.key} className="form-group">
                  <label 
                    className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
                    htmlFor={placeholder.key}
                  >
                    {placeholder.label}
                    {placeholder.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {placeholder.type === 'textarea' ? (
                    <textarea
                      id={placeholder.key}
                      value={placeholderValues[placeholder.key] || ""}
                      onChange={(e) => handleInputChange(placeholder.key, e.target.value)}
                      placeholder={`Enter ${placeholder.label.toLowerCase()}`}
                      disabled={readOnly}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400"
                    />
                  ) : placeholder.type === 'date' ? (
                    <input
                      id={placeholder.key}
                      type="date"
                      value={placeholderValues[placeholder.key] || ""}
                      onChange={(e) => handleInputChange(placeholder.key, e.target.value)}
                      disabled={readOnly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200"
                    />
                  ) : (
                    <input
                      id={placeholder.key}
                      type="text"
                      value={placeholderValues[placeholder.key] || ""}
                      onChange={(e) => handleInputChange(placeholder.key, e.target.value)}
                      placeholder={`Enter ${placeholder.label.toLowerCase()}`}
                      disabled={readOnly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400"
                    />
                  )}
                  
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    Placeholder: <code className="bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded">
                      {placeholder.key}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!readOnly && (
          <div className="flex space-x-3">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid() || isGenerating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Document'}
            </button>
            
            <button
              onClick={() => setPlaceholderValues({})}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Live Preview */}
        <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
          <h4 className="font-medium text-gray-900 dark:text-slate-200 mb-3">
            Live Preview:
          </h4>
          <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-800 min-h-[200px]">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
            />
          </div>
        </div>

        {/* Generated Content (if available) */}
        {generatedContent && (
          <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 dark:text-slate-200">
                Generated Document:
              </h4>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent.replace(/<[^>]*>/g, ''));
                }}
                className="text-sm px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-md transition-colors"
              >
                Copy Text
              </button>
            </div>
            <div className="border border-green-300 dark:border-green-600 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: generatedContent }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .template-renderer .prose h1,
        .template-renderer .prose h2,
        .template-renderer .prose h3,
        .template-renderer .prose h4,
        .template-renderer .prose h5,
        .template-renderer .prose h6 {
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        
        .template-renderer .prose p {
          margin-bottom: 0.75em;
        }
        
        .template-renderer .prose ul,
        .template-renderer .prose ol {
          margin: 0.75em 0;
          padding-left: 1.5em;
        }
        
        .template-renderer .prose blockquote {
          border-left: 4px solid #e5e7eb;
          margin: 1em 0;
          padding-left: 1em;
          font-style: italic;
        }
        
        .dark .template-renderer .prose blockquote {
          border-left-color: #374151;
        }
      `}</style>
    </div>
  );
};

export default TemplateRenderer;
