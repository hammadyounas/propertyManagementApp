import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js'

export default function useDesignListing() {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all documents');
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  // Load documents and templates from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        // Load documents
        const savedDocuments = localStorage.getItem('designDocuments');
        if (savedDocuments) {
          const parsedDocuments = JSON.parse(savedDocuments);
          setDocuments(parsedDocuments);
        }

        // Load templates
        const savedTemplates = localStorage.getItem('propertyTemplates');
        if (savedTemplates) {
          const parsedTemplates = JSON.parse(savedTemplates);
          setTemplates(parsedTemplates);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Persist documents to localStorage whenever they change, but avoid initial empty write
  useEffect(() => {
    if (loading || typeof window === 'undefined') return;
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

  const handleOpenTemplateModal = () => {
    setShowTemplateModal(true);
  };

  const handleCloseTemplateModal = () => {
    setShowTemplateModal(false);
    setSelectedTemplateId('');
  };

  const handleCreateWithTemplate = (templateId) => {
    if (!templateId) {
      toast.error('Please select a template first');
      return;
    }
    setShowTemplateModal(false);
    router.push(`/documents/create?template=${templateId}`);
  };

  // Filter documents based on global search and category
  const filteredDocuments = documents.filter(document => {
    const matchesSearch = !globalFilter || 
      document.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      document.content.toLowerCase().includes(globalFilter.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all documents' || 
      document.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalCount = filteredDocuments.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return {
    documents: paginatedDocuments,
    templates,
    selectedTemplateId,
    setSelectedTemplateId,
    showTemplateModal,
    loading,
    globalFilter,
    setGlobalFilter,
    categoryFilter,
    setCategoryFilter,
    handleEdit,
    handleDelete,
    handleSave,
    handleBack,
    currentItem,
    openDeleteModal,
    closeDeleteModal,
    showDeleteModal,
    deleteLoading,
    router,
    // handleDownload,
    handleOpenTemplateModal,
    handleCloseTemplateModal,
    handleCreateWithTemplate,
    // Pagination props
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
  };
}
