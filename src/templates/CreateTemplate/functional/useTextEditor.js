import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function useTextEditor(templateId = null) {
  const router = useRouter();
  const [title, setTitle] = useState('')
  const [editorValue, setEditorValue] = useState('')
  const [category, setCategory] = useState('uncategorized')
  const [loading, setLoading] = useState(false)
  const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Load template data if editing
  useEffect(() => {
    if (templateId) {
      const loadTemplate = () => {
        try {
          const savedTemplates = localStorage.getItem('propertyTemplates');
          if (savedTemplates) {
            const templates = JSON.parse(savedTemplates);
            const template = templates.find(t => t.id === templateId);
            if (template) {
              setTitle(template.title || '');
              setEditorValue(template.content || '');
              setCategory(template.category || 'uncategorized');
            }
          }
        } catch (error) {
          console.error('Error loading template:', error);
        }
      };
      loadTemplate();
    }
  }, [templateId]);

  const handleTriggerImport = () => {
    setShowImportModal(true);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileFromDrop(file);
    }
  };

  const handleFileFromDrop = async (file) => {
    try {
      // Set title from file name (without extension) if title is empty
      const fileName = file.name || "";
      const baseName = fileName.replace(/\.[^.]+$/g, "");
      if (!title && baseName) {
        setTitle(baseName);
      }

      const ext = file.name.split(".").pop().toLowerCase();

      if (ext === "docx") {
        const { default: mammoth } = await import("mammoth/mammoth.browser");
        const buffer = await arrayBufferFromFile(file);
        const { value: html } = await mammoth.convertToHtml(
          { arrayBuffer: buffer },
          {
            styleMap: ["p[style-name='Normal'] => p:fresh"],
          }
        );
        setEditorValue(html || "");
        setShowImportModal(false);
        toast.success('Document imported successfully!');
        return;
      }

      if (ext === "html" || ext === "htm") {
        const html = await textFromFile(file);
        setEditorValue(html || "");
        setShowImportModal(false);
        toast.success('HTML file imported successfully!');
        return;
      }

      if (ext === "txt") {
        const txt = await textFromFile(file);
        const escaped = txt
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        const html = `<p>${escaped.replace(/\n/g, "<br/>")}</p>`;
        setEditorValue(html);
        setShowImportModal(false);
        toast.success('Text file imported successfully!');
        return;
      }

      toast.error("Unsupported file type. Please upload a .docx, .html, or .txt file.");
    } catch (err) {
      console.error("Failed to import file:", err);
      toast.error("Failed to import file. Please try another file.");
    }
  };

  const arrayBufferFromFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

  const textFromFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });

  const handleImportFile = async (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      await handleFileFromDrop(file);
    } catch (err) {
      console.error("Failed to import file:", err);
      toast.error("Failed to import file. Please try another file.");
    }
  };

  // Predefined placeholders for property management

  const insertPlaceholder = (placeholder) => {
    // Create a highlighted placeholder with inline styling - only the placeholder text is highlighted
    const highlightedPlaceholder = `<p style="background-color: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-weight: 500; border: 1px solid #f59e0b;">${placeholder}</p>`;
    
    // For now, append to current content (cursor position insertion will be handled in TemplateEditor)
    const currentContent = editorValue;
    // const newContent = currentContent + placeholder;
    const newContent = currentContent + highlightedPlaceholder;
    setEditorValue(newContent);
  };

  const handleSave = (templateData) => {
    setLoading(true);
    
    try {
      const savedTemplates = localStorage.getItem('propertyTemplates');
      let templates = savedTemplates ? JSON.parse(savedTemplates) : [];
      
      if (templateId) {
        // Update existing template
        templates = templates.map(template => 
          template.id === templateId 
            ? { 
                ...template, 
                ...templateData, 
                updatedAt: new Date().toISOString() 
              }
            : template
        );
      } else {
        // Create new template
        const newTemplate = {
          ...templateData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          date: new Date().toISOString(),
          category: category,
        };
        templates = [newTemplate, ...templates];
      }
      
      localStorage.setItem('propertyTemplates', JSON.stringify(templates));
      
      // Show success message
      toast.success(templateId ? 'Template updated successfully!' : 'Template saved successfully!');
      
      // Redirect to template list
      router.push('/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Error saving template. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/templates');
  };

  return {
    title,
    setTitle,
    editorValue,
    setEditorValue,
    category,
    setCategory,
    loading,
    handleSave,
    handleBack,
    isEdit: !!templateId,
    templateId,
    fileInputRef,
    handleTriggerImport,
    arrayBufferFromFile,
    textFromFile,
    handleImportFile,
    insertPlaceholder,
    showImportModal,
    setShowImportModal,
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleBrowseClick,
  }
}