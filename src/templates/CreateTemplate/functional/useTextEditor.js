import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function useTextEditor(templateId = null) {
  const router = useRouter();
  const [title, setTitle] = useState('')
  const [editorValue, setEditorValue] = useState('')
  const [category, setCategory] = useState('uncategorized')
  const [loading, setLoading] = useState(false)

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
  }
}