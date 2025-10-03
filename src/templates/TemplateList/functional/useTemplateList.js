import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function useTemplateList() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all templates');
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [insertAtCursorFn, setInsertAtCursorFn] = useState(null);

  // Load templates from localStorage on component mount
  useEffect(() => {
    const loadTemplates = () => {
      try {
        const savedTemplates = localStorage.getItem('propertyTemplates');
        if (savedTemplates) {
          const parsedTemplates = JSON.parse(savedTemplates);
          setTemplates(parsedTemplates);
        }
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  // Save templates to localStorage whenever templates change
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem('propertyTemplates', JSON.stringify(templates));
    }
  }, [templates]);

  // Modal handlers
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (templateId) => {
    setCurrentItem(templateId);
    setShowDeleteModal(true);
  };

  const handleEdit = (template) => {
    router.push(`/templates/edit/${template.id}`);
  };

  const insertPlaceholder = (placeholderKey) => {
    if (insertAtCursorFn) {
      insertAtCursorFn(placeholderKey);
    } else {
      console.warn('Editor insert function not ready');
    }
  };

  const handleDelete = async ({ templateId }) => {
    try {
      setDeleteLoading(true);

      setTemplates(prev => {
        const targetId = templateId ?? currentItem;
        const updated = prev.filter(template => template.id !== targetId);
        localStorage.setItem('propertyTemplates', JSON.stringify(updated)); // ✅ update localStorage
        return updated;
      });
  
      closeDeleteModal();
      toast.success('Template deleted successfully.');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Error deleting template!');
    } finally {
      setDeleteLoading(false);
    }
  };
  

  const handleDuplicate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now().toString(),
      title: `${template.title} (Copy)`,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
    };
    
    setTemplates(prev => [duplicatedTemplate, ...prev]);
    toast.success('Template duplicated successfully.');
  };

  const handleSave = (templateData) => {
    if (templateData.id) {
      // Update existing template
      setTemplates(prev => 
        prev.map(template => 
          template.id === templateData.id 
            ? { ...template, ...templateData, updatedAt: new Date().toISOString() }
            : template
        )
      );
    } else {
      // Create new template
      const newTemplate = {
        ...templateData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        date: new Date().toISOString(),
        category: templateData.category || 'uncategorized',
      };
      setTemplates(prev => [newTemplate, ...prev]);
    }
  };

  const handleBack = () => {
    router.push('/templates');
  };

  // Filter templates based on global search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = !globalFilter || 
      template.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      template.content.toLowerCase().includes(globalFilter.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all templates' || 
      template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalCount = filteredTemplates.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return {
    templates: paginatedTemplates,
    loading,
    globalFilter,
    setGlobalFilter,
    categoryFilter,
    setCategoryFilter,
    handleEdit,
    handleDelete,
    handleDuplicate,
    handleSave,
    handleBack,
    openDeleteModal,
    closeDeleteModal,
    showDeleteModal,
    deleteLoading,
    router,
    // Pagination props
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
    setInsertAtCursorFn,
    insertPlaceholder,
  };
}
