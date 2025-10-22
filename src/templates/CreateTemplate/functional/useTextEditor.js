import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  createTemplate,
  updateTemplate,
  fetchTemplateById,
  clearTemplateError
} from '../../../store/features/templates/templateSlice'
import {
  selectTemplate,
  selectTemplateLoading,
  selectTemplateError,
  selectTemplateCreateSuccess
} from '../../../store/features/templates/templateSelectors'
import {
  optimizeTemplateContent,
  compressContent
} from '../../../libs/utils/contentOptimizer'

export default function useTextEditor(templateId = null) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux state
  const template = useSelector(selectTemplate);
  const loading = useSelector(selectTemplateLoading);
  const error = useSelector(selectTemplateError);
  const createSuccess = useSelector(selectTemplateCreateSuccess);
  
  // Local state
  const [title, setTitle] = useState('')
  const [editorValue, setEditorValue] = useState('')
  const [showImportModal, setShowImportModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Load template data if editing
  useEffect(() => {
    if (templateId) {
      dispatch(fetchTemplateById(templateId));
    }
  }, [templateId, dispatch]);

  // Handle success/error states
  useEffect(() => {
    if (createSuccess) {
      toast.success(templateId ? 'Template updated successfully!' : 'Template created successfully!');
      dispatch(clearTemplateError());
      router.push('/templates');
    }
  }, [createSuccess, dispatch, router, templateId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTemplateError());
    }
  }, [error, dispatch]);

  // Populate form when template is loaded for editing
  useEffect(() => {
    if (template && templateId) {
      setTitle(template.title || '');
      setEditorValue(template.content || '');
    }
  }, [template, templateId]);

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


  const handleSave = async (templateData) => {
    try {
      // Optimize content before saving
      const optimizedContent = optimizeTemplateContent(templateData.content);
      
      // Compress content further if needed
      const finalContent = compressContent(optimizedContent);
      
      const optimizedTemplateData = {
        ...templateData,
        content: finalContent
      };
      
      if (templateId) {
        // Update existing template
        await dispatch(updateTemplate({ 
          id: templateId, 
          data: optimizedTemplateData 
        })).unwrap();
      } else {
        // Create new template
        await dispatch(createTemplate(optimizedTemplateData)).unwrap();
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Error saving template. Please try again.');
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