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
    await import("@syncfusion/ej2-dropdowns/styles/material.css")
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

  // Add custom bullet styles functionality
  useEffect(() => {
    if (!mounted || !rteRef.current) return;

    const editor = rteRef.current;
    
    // Function to apply custom bullet styles
    const applyCustomBulletStyle = (bulletType) => {
      const selection = editor.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const listElement = range.commonAncestorContainer.closest('ul');
      
      if (listElement) {
        // Remove existing data-bullet attributes
        listElement.removeAttribute('data-bullet');
        
        // Apply new bullet style
        if (bulletType !== 'disc' && bulletType !== 'circle' && bulletType !== 'square') {
          listElement.setAttribute('data-bullet', bulletType);
          listElement.style.listStyleType = 'none';
        } else {
          listElement.style.listStyleType = bulletType;
        }
      }
    };

    // Add event listeners for custom bullet buttons (if they exist)
    const addCustomBulletListeners = () => {
      // This would be called when custom bullet buttons are clicked
      // For now, we'll handle it through the editor's change event
    };

    // Listen for editor changes to ensure list styles are applied correctly
    const handleEditorChange = () => {
      // Ensure numbering styles are applied correctly
      const orderedLists = editor.getDocument().querySelectorAll('ol');
      orderedLists.forEach(list => {
        const currentStyle = list.style.listStyleType;
        if (currentStyle) {
          // Force the style to be applied to both the list and its items
          list.style.listStyleType = currentStyle;
          const listItems = list.querySelectorAll('li');
          listItems.forEach(item => {
            item.style.listStyleType = currentStyle;
          });
        }
      });
    };

    // Add the change handler
    editor.addEventListener('change', handleEditorChange);
    
    // Cleanup
    return () => {
      if (editor && editor.removeEventListener) {
        editor.removeEventListener('change', handleEditorChange);
      }
    };
  }, [mounted]);

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
      'BulletFormatList', '|',
      'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|',
      'CreateLink', 'Image', 'CreateTable', '|',
      'ClearFormat', '|',
      'Print', 'SourceCode', 'FullScreen'
    ]
  };

  // Define number format list (hierarchical numbering)
  // const numberFormatList = {
  //   types: [
  //     { text: 'Number', value: 'decimal' },
  //   ]
  // };

  // Define bullet format list (rich bullet styles)
  const bulletFormatList = {
    types: [
      { text: 'Disc', value: 'disc' },
      { text: 'Circle', value: 'circle' },
      { text: 'Square', value: 'square' },
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
      'TableHeader', 'TableRows', 'TableColumns', 'BackgroundColor', '-',
      'Alignments', 'TableCellVerticalAlign', 'Styles', 'TableRemove'
    ]
  };

  // MS Word-like table styles with comprehensive design options
  const tableSettings = {
    width: '100%',
    styles: [
      { text: 'Default Table', class: 'e-rte-table-default' },
      { text: 'Plain Table 1', class: 'e-rte-table-plain-1' },
      { text: 'Plain Table 2', class: 'e-rte-table-plain-2' },
      { text: 'Grid Table 1 Light', class: 'e-rte-table-grid-1' },
      { text: 'Grid Table 2 Blue', class: 'e-rte-table-grid-2' },
      { text: 'Grid Table 3 Striped', class: 'e-rte-table-grid-3' },
      { text: 'Grid Table 4 Green', class: 'e-rte-table-grid-4' },
      { text: 'Grid Table 5 Dark', class: 'e-rte-table-grid-5-dark' },
      { text: 'Grid Table 6 Colorful', class: 'e-rte-table-grid-6-colorful' },
      { text: 'Grid Table 7 Accent', class: 'e-rte-table-grid-7-accent' },
      { text: 'List Table 1 Simple', class: 'e-rte-table-list-1' },
      { text: 'List Table 2 Minimal', class: 'e-rte-table-list-2' },
      { text: 'List Table 3 Accent', class: 'e-rte-table-list-3' },
      { text: 'List Table 4 Bold', class: 'e-rte-table-list-4' },
      { text: 'List Table 5 Medium', class: 'e-rte-table-list-5' },
      { text: 'Colorful Grid', class: 'e-rte-table-colorful-grid' },
      { text: 'Colorful List', class: 'e-rte-table-colorful-list' },
    ],
    resize: true,
    minWidth: 0,
    maxWidth: null,
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
          // numberFormatList={numberFormatList}
          bulletFormatList={bulletFormatList}
          fontFamily={fontFamily}
          fontSize={fontSize}
          format={format}
          tableSettings={tableSettings}
          insertImageSettings={insertImageSettings}
          quickToolbarSettings={quickToolbarSettings}
          pasteCleanupSettings={pasteCleanupSettings}
          height="calc(100vh - 200px)"
          enableHtmlEncode={false}
          enableXhtml={true}
          enableTabKey={true}
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

        /* MS Word Table Styles */
        .syncfusion-editor .e-rte-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 10px 0;
        }

        .syncfusion-editor .e-rte-content table td,
        .syncfusion-editor .e-rte-content table th {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
        }

        /* Default Table */
        .syncfusion-editor .e-rte-content table.e-rte-table-default {
          border: 1px solid #d1d5db;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-default th {
          background-color: #f3f4f6;
          font-weight: 600;
          text-align: left;
        }

        /* Grid Table 1 - Light */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-1 {
          border: 2px solid #6b7280;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-1 th {
          background-color: #e5e7eb;
          font-weight: 600;
          border: 1px solid #9ca3af;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-1 td {
          border: 1px solid #d1d5db;
        }

        /* Grid Table 2 - Accent Blue */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-2 {
          border: 2px solid #3b82f6;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-2 th {
          background-color: #3b82f6;
          color: white;
          font-weight: 600;
          border: 1px solid #2563eb;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-2 td {
          border: 1px solid #93c5fd;
        }

        /* Grid Table 3 - Striped */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-3 {
          border: 1px solid #d1d5db;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-3 th {
          background-color: #1f2937;
          color: white;
          font-weight: 600;
          border: 1px solid #374151;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-3 tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-3 td {
          border: 1px solid #e5e7eb;
        }

        /* Grid Table 4 - Professional */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-4 {
          border: 2px solid #059669;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-4 th {
          background-color: #059669;
          color: white;
          font-weight: 600;
          border: 1px solid #047857;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-4 td {
          border: 1px solid #a7f3d0;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-4 tbody tr:hover {
          background-color: #d1fae5;
        }

        /* Grid Table 5 Dark */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-5-dark {
          border: 2px solid #1f2937;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-5-dark th {
          background-color: #1f2937;
          color: white;
          font-weight: 600;
          border: 1px solid #111827;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-5-dark td {
          background-color: #374151;
          color: white;
          border: 1px solid #4b5563;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-5-dark tbody tr:nth-child(even) td {
          background-color: #4b5563;
        }

        /* Grid Table 6 Colorful */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-6-colorful {
          border: 2px solid #7c3aed;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-6-colorful th {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          font-weight: 600;
          border: 1px solid #6d28d9;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-6-colorful tbody tr:nth-child(odd) {
          background-color: #faf5ff;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-6-colorful td {
          border: 1px solid #e9d5ff;
        }

        /* List Table 1 - Simple */
        .syncfusion-editor .e-rte-content table.e-rte-table-list-1 {
          border: none;
          border-top: 2px solid #3b82f6;
          border-bottom: 2px solid #3b82f6;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-1 th {
          background-color: transparent;
          font-weight: 600;
          border: none;
          border-bottom: 1px solid #d1d5db;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-1 td {
          border: none;
          border-bottom: 1px solid #e5e7eb;
        }

        /* List Table 2 - Minimal */
        .syncfusion-editor .e-rte-content table.e-rte-table-list-2 {
          border: none;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-2 th {
          background-color: #f3f4f6;
          font-weight: 600;
          border: none;
          border-bottom: 2px solid #6b7280;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-2 td {
          border: none;
          border-bottom: 1px solid #e5e7eb;
        }

        /* List Table 3 - Accent */
        .syncfusion-editor .e-rte-content table.e-rte-table-list-3 {
          border: none;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-3 th {
          background-color: #dbeafe;
          color: #1e40af;
          font-weight: 600;
          border: none;
          border-bottom: 2px solid #3b82f6;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-3 td {
          border: none;
          border-bottom: 1px solid #e5e7eb;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-3 tbody tr:hover {
          background-color: #eff6ff;
        }

        /* List Table 4 - Bold Header */
        .syncfusion-editor .e-rte-content table.e-rte-table-list-4 {
          border: none;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-4 th {
          background-color: #059669;
          color: white;
          font-weight: 700;
          border: none;
          padding: 12px;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-4 td {
          border: none;
          border-bottom: 1px solid #d1d5db;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-4 tbody tr:nth-child(even) {
          background-color: #f0fdf4;
        }

        /* Plain Table 1 - Minimal borders */
        .syncfusion-editor .e-rte-content table.e-rte-table-plain-1 {
          border: 1px solid #e5e7eb;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-plain-1 th {
          background-color: white;
          font-weight: 600;
          border-bottom: 2px solid #d1d5db;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-plain-1 td {
          border: none;
          border-bottom: 1px solid #f3f4f6;
        }

        /* Plain Table 2 - No borders */
        .syncfusion-editor .e-rte-content table.e-rte-table-plain-2 {
          border: none;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-plain-2 th {
          background-color: transparent;
          font-weight: 700;
          border: none;
          border-bottom: 3px solid #1f2937;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-plain-2 td {
          border: none;
          padding: 10px 12px;
        }

        /* Grid Table 7 Accent - Orange */
        .syncfusion-editor .e-rte-content table.e-rte-table-grid-7-accent {
          border: 2px solid #f97316;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-7-accent th {
          background-color: #f97316;
          color: white;
          font-weight: 600;
          border: 1px solid #ea580c;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-7-accent td {
          border: 1px solid #fed7aa;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-grid-7-accent tbody tr:nth-child(even) {
          background-color: #fff7ed;
        }

        /* List Table 5 Medium */
        .syncfusion-editor .e-rte-content table.e-rte-table-list-5 {
          border: none;
          border-top: 3px solid #6366f1;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-5 th {
          background-color: #eef2ff;
          color: #4338ca;
          font-weight: 600;
          border: none;
          border-bottom: 2px solid #6366f1;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-5 td {
          border: none;
          border-bottom: 1px solid #e0e7ff;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-list-5 tbody tr:hover {
          background-color: #f5f3ff;
        }

        /* Colorful Grid - Rainbow */
        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid {
          border: 2px solid #ec4899;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid th {
          background: linear-gradient(90deg, #ec4899 0%, #f59e0b 50%, #10b981 100%);
          color: white;
          font-weight: 600;
          border: 1px solid #db2777;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid td {
          border: 1px solid #fce7f3;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid tbody tr:nth-child(4n+1) {
          background-color: #fef2f2;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid tbody tr:nth-child(4n+2) {
          background-color: #fef3c7;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid tbody tr:nth-child(4n+3) {
          background-color: #d1fae5;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-grid tbody tr:nth-child(4n+4) {
          background-color: #dbeafe;
        }

        /* Colorful List - Teal */
        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-list {
          border: none;
          border-top: 3px solid #14b8a6;
          border-bottom: 3px solid #14b8a6;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-list th {
          background-color: #14b8a6;
          color: white;
          font-weight: 700;
          border: none;
          padding: 12px;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-list td {
          border: none;
          border-bottom: 1px solid #99f6e4;
        }

        .syncfusion-editor .e-rte-content table.e-rte-table-colorful-list tbody tr:hover {
          background-color: #ccfbf1;
        }

        /* Table cell alignment helpers */
        .syncfusion-editor .e-rte-content table td.align-top {
          vertical-align: top;
        }

        .syncfusion-editor .e-rte-content table td.align-middle {
          vertical-align: middle;
        }

        .syncfusion-editor .e-rte-content table td.align-bottom {
          vertical-align: bottom;
        }

        /* Table border styles */
        .syncfusion-editor .e-rte-content table.border-thick {
          border-width: 3px;
        }

        .syncfusion-editor .e-rte-content table.border-double {
          border-style: double;
          border-width: 3px;
        }

        .syncfusion-editor .e-rte-content table.border-dashed {
          border-style: dashed;
        }

        .syncfusion-editor .e-rte-content table.no-border {
          border: none;
        }

        .syncfusion-editor .e-rte-content table.no-border td,
        .syncfusion-editor .e-rte-content table.no-border th {
          border: none;
        }

        /* Enhanced Bullet Styles - Fix for Unicode bullet issue */
        .syncfusion-editor .e-rte-content ul {
          list-style-type: disc;
          padding-left: 2em;
          margin: 0.5em 0;
        }

        .syncfusion-editor .e-rte-content ul li {
          margin: 0.25em 0;
          line-height: 1.5;
          position: relative;
          list-style-position: outside;
        }

        /* Override any text content that shows Unicode bullet */
        .syncfusion-editor .e-rte-content ul li:not([class*="bullet-"]) {
          list-style-type: disc;
        }

        /* Force proper bullet display */
        .syncfusion-editor .e-rte-content ul li::marker {
          color: #374151;
          font-size: 1.2em;
        }

        /* Remove any text content that might show Unicode bullet */
        .syncfusion-editor .e-rte-content ul li::before {
          display: none;
        }

        /* Apply bullet styles based on list-style-type */
        .syncfusion-editor .e-rte-content ul[style*="list-style-type: disc"] li::marker {
          content: "●";
          color: #374151;
          font-size: 1.2em;
        }

        .syncfusion-editor .e-rte-content ul[style*="list-style-type: circle"] li::marker {
          content: "○";
          color: #6b7280;
          font-size: 1.1em;
        }

        .syncfusion-editor .e-rte-content ul[style*="list-style-type: square"] li::marker {
          content: "■";
          color: #1f2937;
          font-size: 1.1em;
        }

        /* Custom bullet styles for special characters */
        .syncfusion-editor .e-rte-content ul[style*="list-style-type: none"] {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul[style*="list-style-type: none"] li::before {
          content: "✓ ";
          color: #059669;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul[style*="list-style-type: none"] li::marker {
          display: none;
        }

        /* Additional custom bullet styles using data attributes */
        .syncfusion-editor .e-rte-content ul[data-bullet="check"] {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="check"] li::before {
          content: "✓ ";
          color: #059669;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="arrow"] {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="arrow"] li::before {
          content: "→ ";
          color: #3b82f6;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="triangle"] {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="triangle"] li::before {
          content: "▶ ";
          color: #dc2626;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="diamond"] {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="diamond"] li::before {
          content: "◆ ";
          color: #7c3aed;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="star"] {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul[data-bullet="star"] li::before {
          content: "★ ";
          color: #f59e0b;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        /* Custom bullet styles - Enhanced with proper Unicode handling */
        .syncfusion-editor .e-rte-content ul.bullet-disc {
          list-style-type: disc;
        }

        .syncfusion-editor .e-rte-content ul.bullet-disc li::marker {
          color: #374151;
          font-size: 1.2em;
          content: "●";
        }

        .syncfusion-editor .e-rte-content ul.bullet-circle {
          list-style-type: circle;
        }

        .syncfusion-editor .e-rte-content ul.bullet-circle li::marker {
          color: #6b7280;
          font-size: 1.1em;
          content: "○";
        }

        .syncfusion-editor .e-rte-content ul.bullet-square {
          list-style-type: square;
        }

        .syncfusion-editor .e-rte-content ul.bullet-square li::marker {
          color: #1f2937;
          font-size: 1.1em;
          content: "■";
        }

        .syncfusion-editor .e-rte-content ul.bullet-check {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul.bullet-check li::before {
          content: "✓ ";
          color: #059669;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul.bullet-check li::marker {
          display: none;
        }

        .syncfusion-editor .e-rte-content ul.bullet-arrow {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul.bullet-arrow li::before {
          content: "→ ";
          color: #3b82f6;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul.bullet-arrow li::marker {
          display: none;
        }

        .syncfusion-editor .e-rte-content ul.bullet-triangle {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul.bullet-triangle li::before {
          content: "▶ ";
          color: #dc2626;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul.bullet-triangle li::marker {
          display: none;
        }

        /* Additional bullet styles */
        .syncfusion-editor .e-rte-content ul.bullet-diamond {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul.bullet-diamond li::before {
          content: "◆ ";
          color: #7c3aed;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul.bullet-diamond li::marker {
          display: none;
        }

        .syncfusion-editor .e-rte-content ul.bullet-star {
          list-style-type: none;
          padding-left: 1.5em;
        }

        .syncfusion-editor .e-rte-content ul.bullet-star li::before {
          content: "★ ";
          color: #f59e0b;
          font-weight: bold;
          position: absolute;
          left: -1.5em;
          display: block;
        }

        .syncfusion-editor .e-rte-content ul.bullet-star li::marker {
          display: none;
        }

        /* Enhanced Numbered Lists */
        .syncfusion-editor .e-rte-content ol {
          padding-left: 2em;
          margin: 0.5em 0;
        }

        .syncfusion-editor .e-rte-content ol li {
          margin: 0.25em 0;
          line-height: 1.5;
        }

        /* Numbered list styles - Apply based on actual style attributes */
        .syncfusion-editor .e-rte-content ol[style*="list-style-type: decimal"] {
          list-style-type: decimal !important;
        }

        .syncfusion-editor .e-rte-content ol[style*="list-style-type: decimal-leading-zero"] {
          list-style-type: decimal-leading-zero !important;
        }

        .syncfusion-editor .e-rte-content ol[style*="list-style-type: upper-roman"] {
          list-style-type: upper-roman !important;
        }

        .syncfusion-editor .e-rte-content ol[style*="list-style-type: lower-roman"] {
          list-style-type: lower-roman !important;
        }

        .syncfusion-editor .e-rte-content ol[style*="list-style-type: upper-alpha"] {
          list-style-type: upper-alpha !important;
        }

        .syncfusion-editor .e-rte-content ol[style*="list-style-type: lower-alpha"] {
          list-style-type: lower-alpha !important;
        }

        /* Force numbered list display with proper styling */
        .syncfusion-editor .e-rte-content ol li::marker {
          color: #374151;
          font-weight: 600;
          font-size: 1em;
        }

        /* Ensure all ordered lists have proper numbering */
        .syncfusion-editor .e-rte-content ol {
          counter-reset: item;
        }

        .syncfusion-editor .e-rte-content ol li {
          display: list-item;
          list-style-position: outside;
        }

        /* Remove the problematic decimal-leading-zero override */
        .syncfusion-editor .e-rte-content ol li {
          list-style-type: inherit;
        }

        /* Specific overrides for each numbering type */
        .syncfusion-editor .e-rte-content ol[style*="decimal"] li {
          list-style-type: decimal;
        }

        .syncfusion-editor .e-rte-content ol[style*="decimal-leading-zero"] li {
          list-style-type: decimal-leading-zero;
        }

        .syncfusion-editor .e-rte-content ol[style*="upper-roman"] li {
          list-style-type: upper-roman;
        }

        .syncfusion-editor .e-rte-content ol[style*="lower-roman"] li {
          list-style-type: lower-roman;
        }

        .syncfusion-editor .e-rte-content ol[style*="upper-alpha"] li {
          list-style-type: upper-alpha;
        }

        .syncfusion-editor .e-rte-content ol[style*="lower-alpha"] li {
          list-style-type: lower-alpha;
        }

        /* Numbered list styles */
        .syncfusion-editor .e-rte-content ol.number-decimal {
          list-style-type: decimal;
        }

        .syncfusion-editor .e-rte-content ol.number-decimal-leading {
          list-style-type: decimal-leading-zero;
        }

        .syncfusion-editor .e-rte-content ol.number-upper-roman {
          list-style-type: upper-roman;
        }

        .syncfusion-editor .e-rte-content ol.number-lower-roman {
          list-style-type: lower-roman;
        }

        .syncfusion-editor .e-rte-content ol.number-upper-alpha {
          list-style-type: upper-alpha;
        }

        .syncfusion-editor .e-rte-content ol.number-lower-alpha {
          list-style-type: lower-alpha;
        }

        /* MS Word-like Table Enhancements */
        .syncfusion-editor .e-rte-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .syncfusion-editor .e-rte-content table td,
        .syncfusion-editor .e-rte-content table th {
          padding: 12px 16px;
          vertical-align: top;
          border: 1px solid #d1d5db;
        }

        .syncfusion-editor .e-rte-content table th {
          background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
          font-weight: 600;
          color: #1e293b;
          text-align: left;
        }

        .syncfusion-editor .e-rte-content table tr:nth-child(even) {
          background-color: #f8fafc;
        }

        .syncfusion-editor .e-rte-content table tr:hover {
          background-color: #f1f5f9;
        }

        /* Dark mode bullet styles */
        .dark .syncfusion-editor .e-rte-content ul.bullet-check li::before {
          color: #10b981;
        }

        .dark .syncfusion-editor .e-rte-content ul.bullet-arrow li::before {
          color: #60a5fa;
        }

        .dark .syncfusion-editor .e-rte-content ul.bullet-triangle li::before {
          color: #f87171;
        }

        /* Dark mode table styles */
        .dark .syncfusion-editor .e-rte-content table th {
          background: linear-gradient(to bottom, #334155 0%, #1e293b 100%);
          color: #e2e8f0;
          border-color: #475569;
        }

        .dark .syncfusion-editor .e-rte-content table td {
          border-color: #475569;
          color: #e2e8f0;
        }

        .dark .syncfusion-editor .e-rte-content table tr:nth-child(even) {
          background-color: #1e293b;
        }

        .dark .syncfusion-editor .e-rte-content table tr:hover {
          background-color: #334155;
        }
      `}</style>

    </div>
  )

}

export default TemplateEditor;
