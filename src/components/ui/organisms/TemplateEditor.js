"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

const SyncfusionRTE = dynamic(
  async () => {
    // Import Syncfusion RTE and styles
    const { RichTextEditorComponent, Inject, Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, FileManager, EmojiPicker, Audio, Video, FormatPainter, PasteCleanup } = await import("@syncfusion/ej2-react-richtexteditor")
    
    // Import Syncfusion styles
    await import("@syncfusion/ej2-base/styles/material.css")
    await import("@syncfusion/ej2-inputs/styles/material.css")
    await import("@syncfusion/ej2-lists/styles/material.css")
    await import("@syncfusion/ej2-popups/styles/material.css")
    await import("@syncfusion/ej2-buttons/styles/material.css")
    await import("@syncfusion/ej2-navigations/styles/material.css")
    await import("@syncfusion/ej2-splitbuttons/styles/material.css")
    await import("@syncfusion/ej2-richtexteditor/styles/material.css")

    const RTEWrapper = ({ forwardRef, ...props }) => (
      <RichTextEditorComponent ref={forwardRef} {...props}>
        <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, FileManager, EmojiPicker, Audio, Video, FormatPainter, PasteCleanup]} />
      </RichTextEditorComponent>
    )

    return RTEWrapper
  },
  { 
    ssr: false,
    loading: () => (
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
    )
  }
)

const TemplateEditor = ({
  name,
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
  onInsertAtCursor,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const rteRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setEditorValue(value || defaultValue || "");
  }, [value, defaultValue]);

  // Expose insertAtCursor method to parent
  useEffect(() => {
    if (!onInsertAtCursor || !rteRef.current) return;
      const insertAtCursor = (content) => {
      const editor = rteRef.current;
      if (!editor) return;
      try {
        editor.executeCommand('insertHTML', content);
      } catch (e) {
        console.error('Failed to insert content:', e);
        }
      };
      onInsertAtCursor(insertAtCursor);
  }, [onInsertAtCursor])

  // MS Word-like toolbar configuration with hierarchical numbering and bullet styles
  const toolbarSettings = {
    type: 'MultiRow',
    items: [
      'Undo', 'Redo', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|',
      'NumberFormatList', 'BulletFormatList', '|',
      'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|',
      'CreateLink', 'Image', 'Audio', 'Video', 'CreateTable', '|',
      'FormatPainter', 'ClearFormat', '|',
      'Print', 'SourceCode', 'FullScreen'
    ]
  };

  // Define number format list (hierarchical numbering)
  const numberFormatList = {
    types: [
      { text: '1, 2, 3', value: 'decimal' },
      { text: '1., 2., 3.', value: 'decimal' },
      { text: 'I, II, III', value: 'upper-roman' },
      { text: 'i, ii, iii', value: 'lower-roman' },
      { text: 'A, B, C', value: 'upper-alpha' },
      { text: 'a, b, c', value: 'lower-alpha' },
    ]
  };

  // Define bullet format list (rich bullet styles)
  const bulletFormatList = {
    types: [
      { text: '●', value: 'disc' },
      { text: '○', value: 'circle' },
      { text: '■', value: 'square' },
      { text: '✓', value: 'check' },
      { text: '→', value: 'arrow' },
      { text: '▶', value: 'triangle' },
    ]
  };

  const fontFamily = {
    default: 'Calibri',
    items: [
      { text: 'Arial', value: 'Arial, Helvetica, sans-serif' },
      { text: 'Times New Roman', value: 'Times New Roman, Times, serif' },
      { text: 'Calibri', value: 'Calibri, Segoe UI, Arial, sans-serif' },
      { text: 'Cambria', value: 'Cambria, Georgia, Times New Roman, serif' },
      { text: 'Garamond', value: 'Garamond, Times New Roman, serif' },
      { text: 'Georgia', value: 'Georgia, Times New Roman, serif' },
      { text: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
      { text: 'Courier New', value: 'Courier New, Courier, monospace' },
      { text: 'Verdana', value: 'Verdana, Geneva, Tahoma, sans-serif' },
      { text: 'Segoe UI', value: 'Segoe UI, Arial, sans-serif' },
      { text: 'Trebuchet MS', value: 'Trebuchet MS, Arial, sans-serif' },
      { text: 'Tahoma', value: 'Tahoma, Geneva, Verdana, sans-serif' },
    ]
  };

  const fontSize = {
    default: '14px',
    items: [
      { text: '8', value: '8px' },
      { text: '10', value: '10px' },
      { text: '11', value: '11px' },
      { text: '12', value: '12px' },
      { text: '14', value: '14px' },
      { text: '16', value: '16px' },
      { text: '18', value: '18px' },
      { text: '20', value: '20px' },
      { text: '22', value: '22px' },
      { text: '24', value: '24px' },
      { text: '26', value: '26px' },
      { text: '28', value: '28px' },
      { text: '32', value: '32px' },
      { text: '36', value: '36px' },
      { text: '48', value: '48px' },
      { text: '72', value: '72px' },
    ]
  };

  const format = {
    default: 'Paragraph',
    types: [
      { text: 'Paragraph', value: 'P' },
      { text: 'Heading 1', value: 'H1' },
      { text: 'Heading 2', value: 'H2' },
      { text: 'Heading 3', value: 'H3' },
      { text: 'Heading 4', value: 'H4' },
      { text: 'Heading 5', value: 'H5' },
      { text: 'Heading 6', value: 'H6' },
      { text: 'Code', value: 'Pre' },
      { text: 'Quotation', value: 'BlockQuote' },
    ]
  };

  const insertImageSettings = {
    display: 'inline',
    width: 'auto',
    height: 'auto',
    saveFormat: 'Base64',
    saveUrl: null,
    path: null,
  };

  const quickToolbarSettings = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
      'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'
    ],
    link: ['Open', 'Edit', 'UnLink'],
    table: [
      'TableHeader', 'TableRows', 'TableColumns', 'BackgroundColor',
      '-', 'TableRemove', 'Alignments', 'TableCellVerticalAlign', 'Styles'
    ]
  };

  const pasteCleanupSettings = {
    prompt: false,
    plainText: false,
    keepFormat: true,
    deniedTags: [],
    deniedAttrs: [],
    allowedStyleProps: [
      'background', 'background-color', 'border', 'border-bottom', 'border-left', 'border-radius',
      'border-right', 'border-top', 'border-style', 'border-width', 'color', 'font-family',
      'font-size', 'font-weight', 'font-style', 'height', 'left', 'line-height', 'margin',
      'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'max-height', 'max-width',
      'min-height', 'min-width', 'padding', 'padding-bottom', 'padding-left', 'padding-right',
      'padding-top', 'text-align', 'text-decoration', 'text-indent', 'top', 'vertical-align',
      'width', 'letter-spacing'
    ]
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
      
      <div className="syncfusion-editor">
        <SyncfusionRTE
          forwardRef={rteRef}
          value={editorValue}
          placeholder={placeholder}
          toolbarSettings={toolbarSettings}
          fontFamily={fontFamily}
          fontSize={fontSize}
          format={format}
          numberFormatList={numberFormatList}
          bulletFormatList={bulletFormatList}
          insertImageSettings={insertImageSettings}
          quickToolbarSettings={quickToolbarSettings}
          pasteCleanupSettings={pasteCleanupSettings}
          height="calc(100vh - 200px)"
          enableHtmlEncode={false}
          enableXhtml={true}
          change={(args) => {
            const content = args.value || "";
            setEditorValue(content);
            if (onChange) onChange(content);
          }}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 dark:text-slate-200">{error.message}</p>
      )}

        <style jsx global>{`
        .syncfusion-editor .e-richtexteditor .e-rte-content {
          min-height: calc(100vh - 200px);
          padding: 24px;
          font-family: Calibri, Segoe UI, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }

        /* MS Word-like toolbar styling */
        .syncfusion-editor .e-toolbar {
          background: linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%);
          border-bottom: 2px solid #d1d5db;
          padding: 8px;
        }

        .syncfusion-editor .e-toolbar .e-toolbar-item {
          margin: 2px;
        }

        .syncfusion-editor .e-toolbar .e-btn {
          border-radius: 3px;
          transition: all 0.15s ease;
        }

        .syncfusion-editor .e-toolbar .e-btn:hover {
          background-color: #e5e7eb;
        }

        .syncfusion-editor .e-toolbar .e-btn.e-active {
          background-color: #dbeafe;
          border-color: #3b82f6;
        }

        /* Hierarchical Numbering Styles - Multi-level lists */
        .syncfusion-editor .e-rte-content ol {
          counter-reset: item;
          padding-left: 2em;
        }

        .syncfusion-editor .e-rte-content ol > li {
          counter-increment: item;
          margin-bottom: 0.5em;
        }

        /* Level 1: 1, 2, 3 */
        .syncfusion-editor .e-rte-content ol > li::marker {
          content: counter(item) ". ";
          font-weight: 600;
        }

        /* Level 2: 1.1, 1.2, 1.3 */
        .syncfusion-editor .e-rte-content ol ol > li::marker {
          content: counter(item, decimal) "." counter(item) " ";
        }

        /* Level 3: 1.1.1, 1.1.2 */
        .syncfusion-editor .e-rte-content ol ol ol > li::marker {
          content: counter(item, decimal) "." counter(item) "." counter(item) " ";
        }

        /* Rich Bullet Styles */
        .syncfusion-editor .e-rte-content ul {
          list-style-type: none;
          padding-left: 2em;
        }

        .syncfusion-editor .e-rte-content ul > li {
          position: relative;
          margin-bottom: 0.5em;
        }

        /* Default bullet - filled circle */
        .syncfusion-editor .e-rte-content ul > li::before {
          content: "\\2022";
          position: absolute;
          left: -1.5em;
          font-size: 1.2em;
          line-height: 1.2;
        }

        /* Level 2 - hollow circle */
        .syncfusion-editor .e-rte-content ul ul > li::before {
          content: "\\25E6";
        }

        /* Level 3 - square */
        .syncfusion-editor .e-rte-content ul ul ul > li::before {
          content: "\\25AA";
        }

        /* Custom bullet styles via class */
        .syncfusion-editor .e-rte-content ul.check-list > li::before {
          content: "\\2713";
          color: #16a34a;
          font-weight: 600;
        }

        .syncfusion-editor .e-rte-content ul.arrow-list > li::before {
          content: "\\2192";
          color: #2563eb;
        }

        .syncfusion-editor .e-rte-content ul.triangle-list > li::before {
          content: "\\25B6";
          color: #7c3aed;
          font-size: 0.8em;
          top: 0.2em;
        }

        /* Dark mode support */
        .dark .syncfusion-editor .e-richtexteditor .e-rte-content {
          background-color: #1e293b;
          color: #e2e8f0;
        }

        .dark .syncfusion-editor .e-toolbar {
          background: linear-gradient(to bottom, #334155 0%, #1e293b 100%);
          border-color: #475569;
        }

        .dark .syncfusion-editor .e-toolbar .e-btn:hover {
          background-color: #475569;
        }

        .dark .syncfusion-editor .e-toolbar .e-btn.e-active {
          background-color: #1e40af;
          border-color: #3b82f6;
        }

        /* Syncfusion popup/dropdown dark mode */
        .dark .e-dropdown-popup,
        .dark .e-popup {
          background-color: #1e293b !important;
          border-color: #475569 !important;
        }

        .dark .e-dropdown-popup .e-item,
        .dark .e-popup .e-item {
          color: #e2e8f0 !important;
        }

        .dark .e-dropdown-popup .e-item:hover,
        .dark .e-popup .e-item:hover {
          background-color: #334155 !important;
        }
      `}</style>

    </div>
  )

}

export default TemplateEditor;
