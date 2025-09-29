"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"


const TemplateEditor = ({   name,
  label,
  placeholder = "",
  value = "",
  onChange,
  error,
  defaultValue = "",
  className = "",
  description, 
  setDescription,
  editorValue,
  setEditorValue,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  // const [editorValue, setEditorValue] = useState(value || defaultValue || "");
  const quillRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setEditorValue(value || defaultValue || "");
  }, [value, defaultValue]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    }),
    []
  )

  const formats = useMemo(
    () => [
      "header",
      "bold", 
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "script",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "align",
      "link",
      "image",
      // "video",
    ],
    []
  )

    const handleChange = (content, delta, source, editor) => {
    setEditorValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  if (!mounted) {
    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
          >
            {label}
          </label>
        )}
        <div className="border border-gray-300 dark:border-slate-600 rounded-lg">
          <div className="h-10 bg-gray-100 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-600 rounded-t-lg flex items-center px-3">
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-32 bg-white dark:bg-slate-800 rounded-b-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm dark:text-slate-200">Loading editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      
      <div className="rich-text-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={editorValue}
          onChange={handleChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          className="dark-mode-editor"
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 dark:text-slate-200">{error.message}</p>
      )}

        <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: calc(100vh - 200px);
          font-size: 16px;
          line-height: 1.6;
          padding: 24px;
          background-color: white;
          color: #374151;
          border: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .dark .rich-text-editor .ql-editor {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
        }
        
        .rich-text-editor .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 0;
          background-color: #f9fafb;
          padding: 8px 16px;
        }
        
        .dark .rich-text-editor .ql-toolbar {
          background-color: #1e293b !important;
          border-color: #475569 !important;
        }
        
        .rich-text-editor .ql-container {
          border: none;
          border-radius: 0;
          font-family: inherit;
          background-color: white;
        }
        
        .dark .rich-text-editor .ql-container {
          background-color: #1e293b !important;
          border-color: #475569 !important;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          left: 15px;
          right: 15px;
        }
        
        .dark .rich-text-editor .ql-editor.ql-blank::before {
          color: #94a3b8 !important;
        }
        
        .rich-text-editor.error .ql-toolbar {
          border-color: #ef4444;
        }
        
        .rich-text-editor.error .ql-container {
          border-color: #ef4444;
        }
        
        .rich-text-editor .ql-picker {
          color: #374151;
        }
        
        .dark .rich-text-editor .ql-picker {
          color: #e2e8f0 !important;
        }
        
        .dark .rich-text-editor .ql-picker-options {
          background-color: #1e293b !important;
          border-color: #475569 !important;
        }
        
        .rich-text-editor .ql-stroke {
          stroke: #374151;
        }
        
        .dark .rich-text-editor .ql-stroke {
          stroke: #e2e8f0 !important;
        }
        
        .rich-text-editor .ql-fill {
          fill: #374151;
        }
        
        .dark .rich-text-editor .ql-fill {
          fill: #e2e8f0 !important;
        }
        
        .dark .rich-text-editor .ql-picker-label {
          color: #e2e8f0 !important;
        }
        
        .dark .rich-text-editor .ql-active {
          color: #f1b62e !important;
        }
        
        .dark .rich-text-editor .ql-active .ql-stroke {
          stroke: ##f1b62e !important;
        }
        
        .dark .rich-text-editor .ql-active .ql-fill {
          fill: ##f1b62e !important;
        }
      `}</style>

    </div>
  )

}

export default TemplateEditor;