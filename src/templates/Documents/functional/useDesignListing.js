import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function useDesignListing() {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all documents');
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load templates from localStorage on component mount
  useEffect(() => {
    const loadDocuments = () => {
      try {
        
        const savedDocuments = localStorage.getItem('designDocuments');
        if (savedDocuments) {
          const parsedDocuments = JSON.parse(savedDocuments);
          setDocuments(parsedDocuments);
        }
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  // Persist documents to localStorage whenever they change, but avoid initial empty write
  useEffect(() => {
    if (loading) return;
    try {
      localStorage.setItem('designDocuments', JSON.stringify(documents));
    } catch (error) {
      console.error('Error saving documents:', error);
    }
  }, [documents, loading]);

  // Modal handlers
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (documentId) => {
    setCurrentItem(documentId);
    setShowDeleteModal(true);
  };

  const handleEdit = (document) => {
    router.push(`/documents/edit/${document.id}`);
  };

  const handleDelete = async ({ documentId } = {}) => {
    try {
      setDeleteLoading(true);
  
      setDocuments(prev => {
        const targetId = documentId ?? currentItem;
        const updated = prev.filter(document => document.id !== targetId);
        localStorage.setItem('designDocuments', JSON.stringify(updated)); // ✅ update localStorage
        return updated;
      });
  
      closeDeleteModal();
      toast.success('Document deleted successfully.');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error deleting document!');
    } finally {
      setDeleteLoading(false);
    }
  };
  

  const handleDuplicate = (document) => {
    const duplicatedTemplate = {
      ...document,
      id: Date.now().toString(),
      title: `${document.title} (Copy)`,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
    };
    
    setDocuments(prev => [duplicatedTemplate, ...prev]);
    toast.success('Template duplicated successfully.');
  };

  const handleSave = (documentData) => {
    if (documentData.id) {
      // Update existing template
      setDocuments(prev => 
        prev.map(document => 
          document.id === documentData.id 
            ? { ...document, ...documentData, updatedAt: new Date().toISOString() }
            : document
        )
      );
    } else {
      // Create new template
      const newDocument = {
        ...templateData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        date: new Date().toISOString(),
        category: templateData.category || 'uncategorized',
      };
      setDocuments(prev => [newDocument, ...prev]);
    }
  };

  const handleBack = () => {
    router.push('/documents');
  };

  // Filter templates based on global search and category
  const filteredDocuments = documents.filter(document => {
    const matchesSearch = !globalFilter || 
      document.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      document.content.toLowerCase().includes(globalFilter.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all documents' || 
      document.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return {
    documents: filteredDocuments,
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
    currentItem,
    openDeleteModal,
    closeDeleteModal,
    showDeleteModal,
    deleteLoading,
    router,
  };
}
