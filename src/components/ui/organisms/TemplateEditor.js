"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import toast from "react-hot-toast"

const SyncfusionDocEditor = dynamic(
  async () => {
    // Import Syncfusion DocumentEditor and styles
    const { DocumentEditorContainerComponent, Toolbar, Inject, Print } = await import("@syncfusion/ej2-react-documenteditor")
    
    // Import Syncfusion styles
    await import("@syncfusion/ej2-base/styles/material.css")
    await import("@syncfusion/ej2-inputs/styles/material.css")
    await import("@syncfusion/ej2-lists/styles/material.css")
    await import("@syncfusion/ej2-popups/styles/material.css")
    await import("@syncfusion/ej2-buttons/styles/material.css")
    await import("@syncfusion/ej2-navigations/styles/material.css")
    await import("@syncfusion/ej2-splitbuttons/styles/material.css")
    await import("@syncfusion/ej2-dropdowns/styles/material.css")
    await import("@syncfusion/ej2-documenteditor/styles/material.css")

    const DocEditorWrapper = ({ forwardRef, height, showPropertiesPane, contentChange, created, ...otherProps }) => (
      <DocumentEditorContainerComponent 
        ref={forwardRef}
        width="90%"
        height={height || "700px"}
        enableToolbar={true}
        enablePrint={true}
        showPropertiesPane={showPropertiesPane}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        contentChange={contentChange}
        created={created}
        // Performance optimizations
        enableOptimizedTextMeasuring={true}
        enableSelectionResize={false}
        enableSpellCheck={false}
        enableAutoFocus={true}
        // Text direction settings
        locale="en-US"
        // Disable unnecessary features for better performance
        enableHyperlinkDialog={false}
        enableBookmarkDialog={false}
        enableTableOfContentsDialog={false}
        enableFootnotesDialog={false}
        enableTableDialog={false}
        enableColumnsDialog={false}
        enablePageSetupDialog={false}
        enableStyleDialog={false}
        enableFontDialog={false}
        enableParagraphDialog={false}
        enableListDialog={false}
        enableTableOptionsDialog={false}
        enableBordersAndShadingDialog={false}
        enableTableStylesDialog={false}
        enableTablePropertiesDialog={false}
      >
        <Inject services={[Toolbar, Print]} />
      </DocumentEditorContainerComponent>
    )

    return DocEditorWrapper
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
          <span className="text-gray-500 text-sm dark:text-slate-200">Loading document editor...</span>
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
  const [editorCreated, setEditorCreated] = useState(false);
  const docEditorRef = useRef(null);
  const isInternalUpdate = useRef(false); // Track if update is from editor itself
  const lastLoadedContent = useRef(null); // Track last loaded content to prevent reloads

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler for when the editor is created
  const handleEditorCreated = () => {
    console.log('Editor created event fired');
    setEditorCreated(true);
  };

  // Set text direction to LTR (Left-to-Right) for English editing
  useEffect(() => {
    if (!mounted || !docEditorRef.current?.documentEditor) return;
    
    const setTextDirectionLTR = () => {
      try {
        const editor = docEditorRef.current.documentEditor;
        if (editor) {
          // Force LTR text direction
          editor.selection.paragraphFormat.bidi = false;
          editor.selection.paragraphFormat.textAlignment = 'Left';
          
          // Set document locale to English
          if (editor.documentEditor) {
            editor.documentEditor.locale = 'en-US';
          }
          
          // Disable RTL support completely
          editor.documentHelper.enableRtlSupport = false;
          
          // Set default paragraph format for new content
          const defaultFormat = editor.selection.paragraphFormat;
          defaultFormat.bidi = false;
          defaultFormat.textAlignment = 'Left';
          
          console.log('Text direction set to LTR (Left-to-Right)');
        }
      } catch (error) {
        console.error('Error setting text direction:', error);
      }
    };
    
    // Set direction with multiple attempts to ensure it sticks
    setTimeout(setTextDirectionLTR, 500);
    setTimeout(setTextDirectionLTR, 1000);
    setTimeout(setTextDirectionLTR, 2000);
  }, [mounted]);

  // Initialize internal state from value or defaultValue props
  // Note: This should NOT use editorValue as a dependency to avoid circular updates
  useEffect(() => {
    if (value || defaultValue) {
      // Only set initial value if we don't have content yet
      if (!editorValue || editorValue === '') {
        if (setEditorValue && typeof setEditorValue === 'function') {
          setEditorValue(value || defaultValue);
        }
      }
    }
  }, [value, defaultValue]); // Removed editorValue from dependencies

  // Load content into DocumentEditor when it's ready
  useEffect(() => {
    if (!mounted || !docEditorRef.current?.documentEditor) return;
    
    // Skip loading if this is an internal update from the editor itself
    if (isInternalUpdate.current) {
      console.log('Skipping content load - internal update');
      return;
    }
    
    // Skip loading if the content hasn't changed
    if (editorValue === lastLoadedContent.current) {
      console.log('Skipping content load - content unchanged');
      return;
    }
    
    const loadContent = async () => {
      try {
        const editor = docEditorRef.current.documentEditor;
        if (editorValue && editorValue.trim() !== '') {
          debugDocumentContent(editorValue, 'Loading content');
          const format = detectDocumentFormat(editorValue);
          console.log('Detected document format:', format);
          
          // Update the last loaded content
          lastLoadedContent.current = editorValue;
          
          switch (format) {
            case 'sfdt':
              // Syncfusion Document Format - load directly to preserve all formatting
              console.log('Loading SFDT document...');
              try {
                // Check if document uses abbreviated format (corrupted format)
                const isAbbreviated = editorValue.includes('"optimizeSfdt":false');
                
                if (isAbbreviated) {
                  console.error('❌ CORRUPTED DOCUMENT: This document uses abbreviated SFDT format (optimizeSfdt: false)');
                  console.error('This format was created by a buggy contentOptimizer and cannot be loaded.');
                  console.error('The document must be deleted and recreated.');
                  
                  // Show user-friendly error message
                  editor.openBlank();
                  await new Promise(resolve => setTimeout(resolve, 300));
                  
                  const errorMessage = `❌ DOCUMENT CORRUPTED - CANNOT LOAD\n\n` +
                    `This template was saved in a corrupted format and cannot be opened.\n\n` +
                    `What happened:\n` +
                    `• The document was saved with "optimizeSfdt: false" (abbreviated format)\n` +
                    `• Syncfusion DocumentEditor cannot parse this format\n` +
                    `• The internal document structure is incomplete\n\n` +
                    `Solution:\n` +
                    `1. Go back to the Templates list\n` +
                    `2. Delete this template\n` +
                    `3. Create a new template\n` +
                    `4. New templates will work correctly (bug is now fixed)\n\n` +
                    `Note: This bug has been fixed. All NEW templates will save and load correctly.`;
                  
                  editor.editor.insertText(errorMessage);
                  
                  // Show toast notification
                  setTimeout(() => {
                    toast.error('This template is corrupted and must be deleted and recreated.', {
                      duration: 8000
                    });
                  }, 1000);
                  
                  return; // Don't try to load
                }
                
                // Try to open the SFDT document (should only reach here if NOT abbreviated)
                console.log('Opening SFDT document...');
                editor.open(editorValue);
                console.log('Document opened successfully');
                
              } catch (openError) {
                console.error('Error loading SFDT document:', openError);
                
                // Show error message to user
                try {
                  editor.openBlank();
                  await new Promise(resolve => setTimeout(resolve, 300));
                  
                  const errorMsg = `⚠️ Failed to load document\n\n` +
                    `Error: ${openError.message}\n\n` +
                    `This template may be corrupted. Please delete it and create a new one.`;
                  
                  editor.editor.insertText(errorMsg);
                } catch (fallbackError) {
                  console.error('Could not show error message:', fallbackError);
                }
              }
              break;
            case 'html':
              // HTML content - convert to proper document format
              await loadHtmlContent(editor, editorValue);
              break;
            case 'text':
              // Plain text content
            editor.editor.insertText(editorValue);
              break;
            default:
              console.warn('Unknown document format, treating as plain text');
              editor.editor.insertText(editorValue);
              break;
          }
          
          // After loading content, ensure text direction is LTR
          setTimeout(() => {
            try {
              editor.selection.paragraphFormat.bidi = false;
              console.log('Text direction set to LTR after content load');
            } catch (dirError) {
              console.warn('Could not set text direction:', dirError);
            }
          }, 200);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        // Try fallback loading methods
        try {
          console.log('Attempting fallback content loading...');
          if (editorValue && typeof editorValue === 'string') {
            const textContent = editorValue.replace(/<[^>]*>/g, '');
            editor.editor.insertText(textContent);
          }
        } catch (fallbackError) {
          console.error('Fallback loading also failed:', fallbackError);
        }
      }
    };

    loadContent();
  }, [mounted, editorValue]);

  // Function to properly load HTML content with styling
  const loadHtmlContent = async (editor, htmlContent) => {
    try {
      // Clear existing content
      editor.editor.clear();
      
      // Method 1: Try using Syncfusion's insertHtml method if available
      try {
        if (editor.editor.insertHtml) {
          console.log('Using insertHtml method...');
          editor.editor.insertHtml(htmlContent);
          console.log('HTML inserted successfully with formatting');
          return;
        }
      } catch (insertHtmlError) {
        console.warn('insertHtml method failed:', insertHtmlError);
      }
      
      // Method 2: Try using Syncfusion's paste functionality
      try {
        console.log('Attempting to paste HTML content with formatting...');
        // Create a clipboard event with HTML data
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/html', htmlContent);
        clipboardData.setData('text/plain', htmlContent.replace(/<[^>]*>/g, ''));
        
        // Use the editor's paste method
        editor.editor.paste(htmlContent);
        console.log('HTML pasted successfully with formatting');
        return;
      } catch (pasteError) {
        console.warn('Paste method failed, trying alternative approach:', pasteError);
      }
      
      // Method 2: Parse HTML and convert to document format manually
      console.log('Using manual HTML parsing...');
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Process each element and convert to document format
      await processHtmlElements(editor, doc.body);
      
      } catch (error) {
      console.error('Error processing HTML content:', error);
      // Fallback: insert as plain text
      const textContent = htmlContent.replace(/<[^>]*>/g, '');
      editor.editor.insertText(textContent);
    }
  };

  // Helper function to detect document format
  const detectDocumentFormat = (content) => {
    if (!content || typeof content !== 'string') {
      return 'unknown';
    }

    // Check for Syncfusion Document Format (SFDT) - both full and abbreviated formats
    // Full SFDT uses: "sections", "characters", "paragraphs"
    // Abbreviated SFDT (optimizeSfdt: false) uses: "sec", "b", "ahb", "i"
    if (content.includes('"sections"') || 
        content.includes('"characters"') || 
        content.includes('"paragraphs"') ||
        content.includes('"documentHelper"') ||
        content.includes('"sec":[') ||  // Abbreviated "sections"
        content.includes('"optimizeSfdt"') ||  // SFDT flag
        content.includes('"ahb"') ||  // Abbreviated format indicator
        (content.trim().startsWith('{') && (content.includes('"sec"') || content.includes('"sections"')))) {
      return 'sfdt';
    }

    // Check for HTML
    if (content.includes('<') && content.includes('>')) {
      return 'html';
    }

    // Check for plain text
    return 'text';
  };

  // Debug function to log document content details
  const debugDocumentContent = (content, operation) => {
    if (!content) {
      console.log(`${operation}: No content provided`);
      return;
    }
    
    console.log(`${operation}: Content length: ${content.length}`);
    console.log(`${operation}: Content preview: ${content.substring(0, 100)}...`);
    console.log(`${operation}: Content format: ${detectDocumentFormat(content)}`);
    
    if (content.includes('"sections"')) {
      console.log(`${operation}: Contains sections - likely SFDT format`);
    }
    if (content.includes('<')) {
      console.log(`${operation}: Contains HTML tags`);
    }
  };

  // Process HTML elements and convert to document format
  const processHtmlElements = async (editor, element) => {
    for (const child of element.children) {
      await processElement(editor, child);
    }
  };

  // Process individual HTML element
  const processElement = async (editor, element) => {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent.trim();
    
    if (!textContent) return;

    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        await insertHeading(editor, tagName, textContent);
        break;
      case 'p':
        await insertParagraph(editor, textContent, element);
        break;
      case 'table':
        await insertTable(editor, element);
        break;
      case 'ol':
      case 'ul':
        await insertList(editor, element);
        break;
      case 'strong':
      case 'b':
        await insertBoldText(editor, textContent);
        break;
      case 'em':
      case 'i':
        await insertItalicText(editor, textContent);
        break;
      default:
        await insertParagraph(editor, textContent);
        break;
    }
  };

  // Insert heading with proper formatting
  const insertHeading = async (editor, level, text) => {
    editor.editor.insertText(text);
    const range = editor.selection;
    const paragraphFormat = editor.selection.getFormat(2); // Get paragraph format
    
    // Apply heading style based on level
    const headingStyle = {
      'h1': 'Heading 1',
      'h2': 'Heading 2', 
      'h3': 'Heading 3',
      'h4': 'Heading 4',
      'h5': 'Heading 5',
      'h6': 'Heading 6'
    };
    
    editor.selection.applyFormat('styleName', headingStyle[level]);
    editor.editor.insertBreak(0); // Insert line break after heading
  };

  // Insert paragraph with proper formatting
  const insertParagraph = async (editor, text, element = null) => {
    if (element) {
      // Check for inline formatting
      const hasStrong = element.querySelector('strong, b');
      const hasEm = element.querySelector('em, i');
      
      if (hasStrong || hasEm) {
        // Insert with formatting
        await insertFormattedText(editor, text, element);
      } else {
        editor.editor.insertText(text);
        editor.editor.insertBreak(0);
      }
    } else {
      editor.editor.insertText(text);
      editor.editor.insertBreak(0);
    }
  };

  // Insert formatted text
  const insertFormattedText = async (editor, text, element) => {
    editor.editor.insertText(text);
    
    // Apply formatting based on element content
    if (element.querySelector('strong, b')) {
      editor.selection.applyFormat('bold', true);
    }
    if (element.querySelector('em, i')) {
      editor.selection.applyFormat('italic', true);
    }
    
    editor.editor.insertBreak(0);
  };

  // Insert bold text
  const insertBoldText = async (editor, text) => {
    editor.editor.insertText(text);
    editor.selection.applyFormat('bold', true);
    editor.editor.insertBreak(0);
  };

  // Insert italic text
  const insertItalicText = async (editor, text) => {
    editor.editor.insertText(text);
    editor.selection.applyFormat('italic', true);
    editor.editor.insertBreak(0);
  };

  // Insert table
  const insertTable = async (editor, tableElement) => {
    const rows = tableElement.querySelectorAll('tr');
    if (rows.length > 0) {
      const cols = rows[0].querySelectorAll('td, th').length;
      
      // Insert table with proper dimensions
      editor.editor.insertTable(rows.length, cols, 0, 0);
      
      // Fill table content
      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td, th');
        for (let j = 0; j < cells.length; j++) {
          const cellText = cells[j].textContent.trim();
          if (cellText) {
            editor.editor.insertText(cellText);
          }
          // Move to next cell
          if (j < cells.length - 1) {
            editor.editor.moveRight();
          }
        }
        // Move to next row
        if (i < rows.length - 1) {
          editor.editor.moveDown();
        }
      }
    }
    editor.editor.insertBreak(0);
  };

  // Insert list
  const insertList = async (editor, listElement) => {
    const items = listElement.querySelectorAll('li');
    const isOrdered = listElement.tagName.toLowerCase() === 'ol';
    
    for (const item of items) {
      const text = item.textContent.trim();
      if (text) {
        editor.editor.insertText(text);
        
        // Apply list formatting
        if (isOrdered) {
          editor.selection.applyFormat('listFormat', { listType: 'NumberList' });
        } else {
          editor.selection.applyFormat('listFormat', { listType: 'BulletList' });
        }
        
        editor.editor.insertBreak(0);
      }
    }
  };

  // Debounced content change handler for better performance
  const [contentChangeTimeout, setContentChangeTimeout] = useState(null);
  
  const handleContentChange = () => {
    // Clear existing timeout
    if (contentChangeTimeout) {
      clearTimeout(contentChangeTimeout);
    }
    
    // Set new timeout to debounce rapid changes
    const newTimeout = setTimeout(() => {
    if (docEditorRef.current?.documentEditor) {
      try {
          // Get the document content in SFDT format (Syncfusion Document Format)
        const content = docEditorRef.current.documentEditor.serialize();
          debugDocumentContent(content, 'Saving content');
          
          // Mark this as an internal update to prevent reload
          isInternalUpdate.current = true;
          lastLoadedContent.current = content;
          
          // Update the editorValue state if setEditorValue is provided
          if (setEditorValue) {
            setEditorValue(content);
          }
          
          // Call the onChange callback if provided
        if (onChange) {
          onChange(content);
        }
          
          // Reset the flag after a short delay
          setTimeout(() => {
            isInternalUpdate.current = false;
          }, 100);
          
          console.log('Content change handled successfully');
      } catch (error) {
        console.error('Error getting document content:', error);
          // Fallback: try to get plain text
          try {
            const plainText = docEditorRef.current.documentEditor.editor.getText();
            console.log('Fallback to plain text:', plainText.substring(0, 100) + '...');
            
            // Mark this as an internal update to prevent reload
            isInternalUpdate.current = true;
            lastLoadedContent.current = plainText;
            
            // Update the editorValue state if setEditorValue is provided
            if (setEditorValue) {
              setEditorValue(plainText);
            }
            
            // Call the onChange callback if provided
            if (onChange) {
              onChange(plainText);
            }
            
            // Reset the flag after a short delay
            setTimeout(() => {
              isInternalUpdate.current = false;
            }, 100);
          } catch (fallbackError) {
            console.error('Fallback content retrieval also failed:', fallbackError);
          }
        }
      }
    }, 300); // 300ms debounce for better typing performance
    
    setContentChangeTimeout(newTimeout);
  };

  // Export helpers
  const handlePrint = () => {
    try {
      const editor = docEditorRef.current?.documentEditor;
      if (!editor) return;
      editor.print();
    } catch (error) {
      console.error('Print failed:', error);
    }
  };

  const handleImportDocument = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.html,.htm,.txt,.docx,.doc';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      try {
        console.log('File selected:', file.name, 'Type:', file.type);
        
        // For DOCX files, use Syncfusion's import service
        if (file.name.endsWith('.docx') || file.name.endsWith('.doc') || 
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/msword') {
          await importDocxFile(file);
        } else {
          const content = await readFileContent(file);
          await importDocument(content);
        }
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error importing file. Please try again.');
      }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const importDocxFile = async (file) => {
    try {
      const editor = docEditorRef.current?.documentEditor;
      if (!editor) return;
      
      console.log('Importing DOCX file using Syncfusion service...');
      
      // Use Syncfusion's import service for DOCX files
      const serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import';
      
      const formData = new FormData();
      formData.append('files', file);
      
      const response = await fetch(serviceUrl, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const sfdt = await response.text();
        console.log('DOCX converted to SFDT successfully');
        editor.open(sfdt);
        
        // Trigger content change to save the imported content
        setTimeout(() => {
          handleContentChange();
        }, 500);
        
        console.log('Document imported successfully');
      } else {
        throw new Error('Failed to convert DOCX file');
      }
    } catch (error) {
      console.error('Error importing DOCX file:', error);
      alert('Error importing DOCX file. Please try again or use HTML format.');
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = (e) => {
        reject(e);
      };
      
      if (file.type === 'text/html' || file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  // Add Export PDF and Print buttons into Syncfusion toolbar
  useEffect(() => {
    if (!mounted || !docEditorRef.current) return;
    
    const addButtons = () => {
      const containerEl = docEditorRef.current?.element;
      if (!containerEl) return;

      // Look for toolbar in multiple possible locations
      const toolbarSelectors = [
        '.e-toolbar .e-toolbar-items',
        '.e-de-ctn .e-toolbar .e-toolbar-items', 
        '.e-documenteditorcontainer-toolbar .e-toolbar-items',
        '.e-toolbar-items'
      ];
      
      let itemsEl = null;
      for (const selector of toolbarSelectors) {
        itemsEl = containerEl.querySelector(selector);
        if (itemsEl) break;
      }
      
      if (!itemsEl) {
        console.log('Toolbar items container not found, retrying...');
        return;
      }

      // Remove any existing custom buttons first to avoid duplicates
      const existingPrint = containerEl.querySelector('#rte-print-btn');
      const existingImport = containerEl.querySelector('#rte-import-btn');
      
      [existingPrint, existingImport].forEach(btn => {
        if (btn && btn.parentElement) {
          btn.parentElement.remove();
        }
      });

      console.log('Adding Print and Import buttons to toolbar...');

      // Create Print button
      const printBtn = document.createElement('button');
      printBtn.id = 'rte-print-btn';
      printBtn.type = 'button';
      printBtn.className = 'e-tbar-btn e-btn e-tbtn-txt e-control';
      printBtn.title = 'Print';
      printBtn.style.cssText = 'min-width: 60px; margin: 2px 4px;';
      
      const printSpan = document.createElement('span');
      printSpan.className = 'e-tbar-btn-text';
      printSpan.textContent = 'Print';
      printBtn.appendChild(printSpan);
      printBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        handlePrint();
      });
      
      const printItem = document.createElement('div');
      printItem.className = 'e-toolbar-item';
      printItem.appendChild(printBtn);

      // Create Import Document button
      const importBtn = document.createElement('button');
      importBtn.id = 'rte-import-btn';
      importBtn.type = 'button';
      importBtn.className = 'e-tbar-btn e-btn e-tbtn-txt e-control';
      importBtn.title = 'Import Document';
      importBtn.style.cssText = 'min-width: 100px; margin: 2px 4px;';
      
      const importSpan = document.createElement('span');
      importSpan.className = 'e-tbar-btn-text';
      importSpan.textContent = 'Import';
      importBtn.appendChild(importSpan);
      importBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        handleImportDocument();
      });
      
      const importItem = document.createElement('div');
      importItem.className = 'e-toolbar-item';
      importItem.appendChild(importBtn);

      // Try to find a good insertion point
      const findBtn = Array.from(itemsEl.querySelectorAll('.e-tbar-btn'))
        .find((n) => (n.getAttribute('title') || '').toLowerCase().includes('find'));
      
      if (findBtn && findBtn.parentElement?.classList.contains('e-toolbar-item')) {
        // Insert before Find button
        itemsEl.insertBefore(importItem, findBtn.parentElement);
        itemsEl.insertBefore(printItem, findBtn.parentElement);
        console.log('Buttons inserted before Find button');
      } else {
        // Append at the end
        itemsEl.appendChild(importItem);
        itemsEl.appendChild(printItem);
        console.log('Buttons appended to end of toolbar');
      }
    };

    // Multiple attempts with different timing
    const attempts = [0, 100, 300, 600, 1000, 1500];
    const timeouts = attempts.map(delay => 
      setTimeout(() => {
        console.log(`Attempting to add buttons after ${delay}ms`);
        addButtons();
      }, delay)
    );

    // Also use MutationObserver for dynamic changes
    const observer = new MutationObserver((mutations) => {
      let shouldRetry = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if toolbar was added or modified
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && (
              node.classList?.contains('e-toolbar') || 
              node.classList?.contains('e-toolbar-items') ||
              node.querySelector?.('.e-toolbar') ||
              node.querySelector?.('.e-toolbar-items')
            )) {
              shouldRetry = true;
            }
          });
        }
      });
      
      if (shouldRetry) {
        setTimeout(addButtons, 100);
        setTimeout(addButtons, 500); // Try again after a longer delay
      }
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [mounted, editorCreated]);

  // Function to import document with proper formatting
  const importDocument = async (content) => {
    if (!docEditorRef.current?.documentEditor) return;
    
    try {
      const editor = docEditorRef.current.documentEditor;
      
      console.log('Importing document...');
      debugDocumentContent(content, 'Import Document');
      
      // Clear existing content
      editor.editor.clear();
      
      // Check if content is HTML
      if (typeof content === 'string' && content.includes('<')) {
        console.log('Detected HTML content, converting to SFDT format...');
        
        // Use Syncfusion's built-in HTML import functionality
        try {
          // Convert HTML to SFDT using Syncfusion's service
          const serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import';
          
          const formData = new FormData();
          const blob = new Blob([content], { type: 'text/html' });
          formData.append('files', blob, 'document.html');
          
          const response = await fetch(serviceUrl, {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            const sfdt = await response.text();
            console.log('HTML converted to SFDT successfully');
            editor.open(sfdt);
            
            // Trigger content change to save the imported content
            setTimeout(() => {
              handleContentChange();
            }, 500);
          } else {
            console.warn('Service conversion failed, using fallback method');
            await loadHtmlContent(editor, content);
            
            // Trigger content change to save the imported content
            setTimeout(() => {
              handleContentChange();
            }, 500);
          }
        } catch (conversionError) {
          console.warn('Error using conversion service, using fallback:', conversionError);
          await loadHtmlContent(editor, content);
          
          // Trigger content change to save the imported content
          setTimeout(() => {
            handleContentChange();
          }, 500);
        }
      } else {
        // Insert as plain text
        editor.editor.insertText(content);
        
        // Trigger content change to save the imported content
        setTimeout(() => {
          handleContentChange();
        }, 500);
      }
      
      console.log('Document imported successfully');
      
      // Ensure text direction is LTR after import
      setTimeout(() => {
        try {
          editor.selection.paragraphFormat.bidi = false;
          console.log('Text direction set to LTR after import');
        } catch (dirError) {
          console.warn('Could not set text direction after import:', dirError);
        }
      }, 600);
    } catch (error) {
      console.error('Error importing document:', error);
      alert('Error importing document. Please try again.');
    }
  };

  // Expose insertAtCursor method to parent
  useEffect(() => {
    if (!onInsertAtCursor || !docEditorRef.current) return;
    const insertAtCursor = (content) => {
      const editor = docEditorRef.current?.documentEditor;
      if (!editor) return;
      try {
        editor.editor.insertText(content);
      } catch (e) {
        console.error('Failed to insert content:', e);
      }
    };
    onInsertAtCursor(insertAtCursor);
  }, [onInsertAtCursor])

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
            <span className="text-gray-500 text-sm dark:text-slate-200">Loading document editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="syncfusion-doc-editor">
        <SyncfusionDocEditor
          forwardRef={docEditorRef}
          height="calc(100vh - 50px)"
          enableToolbar={true}
          showPropertiesPane={true}
          contentChange={handleContentChange}
          created={handleEditorCreated}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 dark:text-slate-200">{error.message}</p>
      )}

        <style jsx global>{`
        /* DocumentEditor Container Styling */
        .syncfusion-doc-editor {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          direction: ltr !important;
          text-align: left !important;
        }

        /* Force LTR text direction for document content */
        .syncfusion-doc-editor .e-de-page-container,
        .syncfusion-doc-editor .e-de-page,
        .syncfusion-doc-editor .e-content,
        .syncfusion-doc-editor .e-de-text {
          direction: ltr !important;
          text-align: left !important;
          unicode-bidi: normal !important;
        }

        /* Ensure cursor starts from left */
        .syncfusion-doc-editor .e-de-ctn-main {
          direction: ltr !important;
        }

        /* Performance optimizations for typing */
        .syncfusion-doc-editor .e-de-text,
        .syncfusion-doc-editor .e-content {
          will-change: auto !important;
          transform: translateZ(0) !important;
          backface-visibility: hidden !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        /* Fix for reverse typing issue */
        .syncfusion-doc-editor .e-de-text * {
          unicode-bidi: normal !important;
          direction: ltr !important;
        }

        /* Custom Print and Import buttons styling */
        .syncfusion-doc-editor #rte-print-btn,
        .syncfusion-doc-editor #rte-import-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 6px 12px !important;
          border: 1px solid #d1d5db !important;
          background-color: #ffffff !important;
          color: #374151 !important;
          border-radius: 4px !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          transition: all 0.15s ease !important;
          cursor: pointer !important;
          min-width: 80px !important;
          margin: 2px 4px !important;
        }

        .syncfusion-doc-editor #rte-print-btn:hover,
        .syncfusion-doc-editor #rte-import-btn:hover {
          background-color: #f3f4f6 !important;
          border-color: #9ca3af !important;
        }

        .syncfusion-doc-editor #rte-print-btn:active,
        .syncfusion-doc-editor #rte-import-btn:active {
          background-color: #e5e7eb !important;
          transform: translateY(1px) !important;
        }

        /* Dark mode for custom buttons */
        .dark .syncfusion-doc-editor #rte-print-btn,
        .dark .syncfusion-doc-editor #rte-import-btn {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #e5e7eb !important;
        }

        .dark .syncfusion-doc-editor #rte-print-btn:hover,
        .dark .syncfusion-doc-editor #rte-import-btn:hover {
          background-color: #4b5563 !important;
          border-color: #6b7280 !important;
        }

        /* On small screens, use full width */
        @media (max-width: 1280px) {
          .syncfusion-doc-editor { width: 100%; }
        }

        .syncfusion-doc-editor .e-documenteditor-container {
          font-family: Calibri, Segoe UI, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .syncfusion-doc-editor .e-de-ctn-title {
          display: none;
        }

        /* MS Word-like toolbar styling */
        .syncfusion-doc-editor .e-toolbar {
          background: linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%);
          border-bottom: 2px solid #d1d5db;
          padding: 8px;
          position: relative;
          z-index: 3; /* keep toolbar above any side panes */
        }

        .syncfusion-doc-editor .e-toolbar .e-toolbar-item {
          margin: 2px 4px; /* tighten spacing */
          flex: 0 0 auto !important; /* prevent shrinking */
        }

        .syncfusion-doc-editor .e-toolbar .e-btn {
          border-radius: 3px;
          transition: all 0.15s ease;
        }

        /* Force toolbar items to wrap when space is tight */
        .syncfusion-doc-editor .e-de-ctn .e-toolbar .e-toolbar-items,
        .syncfusion-doc-editor .e-toolbar .e-toolbar-items {
          flex-wrap: wrap !important;
          height: auto !important;
          overflow: visible !important;
        }

        .syncfusion-doc-editor .e-de-ctn .e-toolbar,
        .syncfusion-doc-editor .e-toolbar {
          overflow: visible !important;
        }

        /* Allow content to flow normally instead of fixed width scrolling */
        .syncfusion-doc-editor .e-de-ctn .e-toolbar .e-hscroll,
        .syncfusion-doc-editor .e-toolbar .e-hscroll {
          overflow: visible !important;
        }
        .syncfusion-doc-editor .e-de-ctn .e-toolbar .e-hscroll-content,
        .syncfusion-doc-editor .e-toolbar .e-hscroll-content {
          white-space: normal !important;
          width: 100% !important;
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: flex-start !important;
          align-items: center !important;
          row-gap: 4px;
          column-gap: 4px;
        }

        /* Ensure the actual items container also wraps */
        .syncfusion-doc-editor .e-documenteditorcontainer-toolbar .e-toolbar-items,
        .syncfusion-doc-editor .e-toolbar .e-toolbar-items {
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          gap: 4px;
          width: 100% !important;
        }

        .syncfusion-doc-editor .e-toolbar .e-toolbar-items .e-toolbar-item {
          flex: 0 0 auto !important;
        }
        .syncfusion-doc-editor .e-de-ctn .e-toolbar .e-scroll-nav,
        .syncfusion-doc-editor .e-toolbar .e-scroll-nav {
          display: none !important;
          width: 0 !important;
          padding: 0 !important;
          border: 0 !important;
        }

        /* Hide any leftover scroll nav variants to avoid empty boxes */
        .syncfusion-doc-editor .e-toolbar .e-hscroll .e-scroll-left,
        .syncfusion-doc-editor .e-toolbar .e-hscroll .e-scroll-right,
        .syncfusion-doc-editor .e-toolbar .e-scroll-nav.e-scroll-left,
        .syncfusion-doc-editor .e-toolbar .e-scroll-nav.e-scroll-right {
          display: none !important;
          width: 0 !important;
          padding: 0 !important;
          border: 0 !important;
        }

        /* Clean up stray separators that can appear as blank items */
        .syncfusion-doc-editor .e-toolbar .e-toolbar-items > .e-separator:first-child,
        .syncfusion-doc-editor .e-toolbar .e-toolbar-items > .e-separator:last-child,
        .syncfusion-doc-editor .e-toolbar .e-toolbar-items > .e-separator + .e-separator {
          display: none !important;
        }

        /* Fallback: on very narrow screens, keep items on one line and enable horizontal scroll */
        @media (max-width: 900px) {
          .syncfusion-doc-editor .e-de-ctn .e-toolbar .e-toolbar-items,
          .syncfusion-doc-editor .e-toolbar .e-toolbar-items { flex-wrap: nowrap !important; }
          .syncfusion-doc-editor .e-de-ctn .e-toolbar,
          .syncfusion-doc-editor .e-toolbar { overflow-x: auto !important; height: auto !important; }
          .syncfusion-doc-editor .e-de-ctn .e-toolbar .e-scroll-nav,
          .syncfusion-doc-editor .e-toolbar .e-scroll-nav { display: block !important; }
        }

        .syncfusion-doc-editor .e-toolbar .e-btn:hover {
          background-color: #e5e7eb;
        }

        .syncfusion-doc-editor .e-toolbar .e-btn.e-active {
          background-color: #dbeafe;
          border-color: #3b82f6;
        }

        /* Page-based document view */
        .syncfusion-doc-editor .e-de-page-container {
          background-color: #f5f5f5;
          display: flex;
          justify-content: center; /* center pages horizontally */
        }

        /* Ensure properties pane is visible and scrollable */
        .syncfusion-doc-editor .e-de-pane { 
          max-width: 380px; 
          min-width: 280px;
          /* Move properties pane to the LEFT */
          order: 1 !important;
          border-left: none !important;
          border-right: 1px solid #e5e7eb !important;
          position: relative;
          z-index: 4; /* below toolbar */
          margin-top: 8px; /* avoid overlapping second row of toolbar */
        }
        .syncfusion-doc-editor .e-de-properties-pane, 
        .syncfusion-doc-editor .e-de-prop-pane { 
          overflow: auto !important; 
          max-height: calc(100vh - 280px); /* leave room under toolbar */
        }

        /* Prevent outer containers from clipping the pane */
        .syncfusion-doc-editor, 
        .syncfusion-doc-editor * { 
          overflow: visible;
        }

        /* Dark mode border swap for left-side pane */
        .dark .syncfusion-doc-editor .e-de-pane {
          border-right-color: #475569 !important;
        }

        .syncfusion-doc-editor .e-de-page {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin: 20px auto; /* ensure centered even if flex fails */
        }

        /* Default table styling - no borders */
        .syncfusion-doc-editor table {
          border-collapse: collapse;
        }

        .syncfusion-doc-editor table td,
        .syncfusion-doc-editor table th {
          padding: 8px 12px;
        }

        /* DocumentEditor preserves headers and footers natively */
        .syncfusion-doc-editor .e-de-header,
        .syncfusion-doc-editor .e-de-footer {
          opacity: 0.7;
          font-size: 0.9em;
        }

        /* Dark mode support */
        .dark .syncfusion-doc-editor .e-de-page-container {
          background-color: #0f172a;
        }

        .dark .syncfusion-doc-editor .e-de-page {
          background-color: #1e293b;
          color: #e2e8f0;
        }

        .dark .syncfusion-doc-editor .e-toolbar {
          background: linear-gradient(to bottom, #334155 0%, #1e293b 100%);
          border-color: #475569;
        }

        /* Dark mode: keep toolbar wrapping consistent */
        .dark .syncfusion-doc-editor .e-toolbar .e-toolbar-items {
          flex-wrap: wrap !important;
        }

        .dark .syncfusion-doc-editor .e-toolbar .e-btn:hover {
          background-color: #475569;
        }

        .dark .syncfusion-doc-editor .e-toolbar .e-btn.e-active {
          background-color: #1e40af;
          border-color: #3b82f6;
        }
      `}</style>

    </div>
  )

}

export default TemplateEditor;
