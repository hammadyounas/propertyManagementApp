import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js'
import { fetchDocuments, deleteDocument } from '../../../store/features/documents/documentSlice';
import { selectDocuments, selectLoading, selectTotalCount } from '../../../store/features/documents/documentSelectors';
import { fetchTemplate } from '../../../store/features/templates/templateSlice';
import { selectTemplates } from '../../../store/features/templates/templateSelectors';

export default function useDesignListing() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux state
  const documents = useSelector(selectDocuments);
  const templates = useSelector(selectTemplates);
  const loading = useSelector(selectLoading);
  const totalCount = useSelector(selectTotalCount);
  
  // Local state
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all documents');
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch documents and templates on component mount
  useEffect(() => {
    dispatch(fetchDocuments({ page: currentPage, limit: pageSize, search: globalFilter }));
    dispatch(fetchTemplate({ all: true })); // Fetch all templates for dropdown
  }, [dispatch, currentPage, pageSize, globalFilter]);

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
    router.push(`/documents/edit/${document._id || document.id}`);
  };

  const handleDelete = async ({ documentId } = {}) => {
    try {
      setDeleteLoading(true);
      const targetId = documentId ?? currentItem;
      
      await dispatch(deleteDocument(targetId)).unwrap();
      
      closeDeleteModal();
      toast.success('Document deleted successfully.');
      
      // Refresh documents list
      dispatch(fetchDocuments({ page: currentPage, limit: pageSize, search: globalFilter }));
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

  // Pagination logic
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1); // Convert from 0-based to 1-based
  };

  return {
    documents,
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
