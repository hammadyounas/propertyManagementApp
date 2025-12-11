import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function useTemplates2Editor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const editorRef = useRef(null);

  const fetchTemplateContent = async (fileName) => {
    try {
      const response = await axios.get(`/api/templates-2/get?fileName=${encodeURIComponent(fileName)}`);
      setHtmlContent(response.data.content || '');
    } catch (error) {
      console.error('Error fetching template:', error);
      toast.error('Failed to load template');
    }
  };

  // Check if editing or duplicating
  useEffect(() => {
    const { file, duplicate, newName } = router.query;
    
    if (duplicate) {
      // Load file to duplicate
      fetchTemplateContent(duplicate);
      if (newName) {
        setTitle(newName.replace('.html', ''));
      }
    } else if (file) {
      // Load file to edit
      fetchTemplateContent(file);
      setTitle(file.replace('.html', ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const handleSave = () => {
    // Ensure we have some content before saving
    if (!htmlContent.trim()) {
      toast.error('Please add some content to the template');
      return;
    }
    
    // Agar edit mode me hai (existing template), to current title ko pre-fill karo
    // Nahi to blank rakho (new template ke liye)
    const { file } = router.query;
    if (file && title) {
      // Edit mode: existing template ka name pre-fill karo
      setTemplateName(title);
    } else {
      // New template: blank rakho
      setTemplateName('');
    }

    // Show modal to get template name from user
    setShowSaveModal(true);
  };

  const performSave = async () => {
    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    setLoading(true);
    setShowSaveModal(false);
    
    try {
      // Get HTML content from TinyMCE
      const content = editorRef.current?.getContent() || htmlContent;

      // Remove legacy auto-page-break divs that come from imported HTML/PDF
      // Ye divs sirf blank white space aur extra pages banate hain, isliye inko save se pehle clean kar rahe hain
      const cleanedContent = content.replace(
        /<div[^>]*class=["']auto-page-break["'][^>]*>[\s\S]*?<\/div>/gi,
        ""
      );

      // Use user-provided template name and remove unwanted prefixes
      let effectiveTitle = templateName.trim();
      // Remove unwanted prefixes like "2._" from the beginning
      effectiveTitle = effectiveTitle.replace(/^(\d+\._)+/i, '');
      // Remove any leading/trailing spaces after prefix removal
      effectiveTitle = effectiveTitle.trim();
      
      // Update title state
      setTitle(effectiveTitle);
      
      // Create full HTML document
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${effectiveTitle}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  ${cleanedContent}
</body>
</html>`;

      const fileName = effectiveTitle.endsWith('.html') ? effectiveTitle : `${effectiveTitle}.html`;
      
      await axios.post('/api/templates-2/save', {
        fileName,
        htmlContent: fullHtml
      });

      toast.success('Template saved successfully!');
      router.push('/templates-2');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSave = () => {
    setShowSaveModal(false);
    setTemplateName('');
  };

  const handleBack = () => {
    router.push('/templates-2');
  };

  return {
    title,
    setTitle,
    htmlContent,
    setHtmlContent,
    loading,
    handleSave,
    handleBack,
    editorRef,
    showSaveModal,
    setShowSaveModal,
    templateName,
    setTemplateName,
    performSave,
    handleCancelSave,
  };
}

