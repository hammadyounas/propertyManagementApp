import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js'
import { fetchDocuments, deleteDocument, uploadPdfToCloudinary, sendEmailWithDocument } from '../../../store/features/documents/documentSlice';
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
  
  // Upload PDF modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingDocumentId, setUploadingDocumentId] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailingDocumentId, setEmailingDocumentId] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const allDocuments = documents || [];

  const filteredDocuments = useMemo(() => {
    const term = (globalFilter || '').trim().toLowerCase();
    if (!term) return allDocuments;

    return allDocuments.filter((doc) => {
      const docId = (doc?.doc_id || doc?.docId || doc?.id || '').toString().toLowerCase();
      const title = (doc?.title || '').toLowerCase();
      const client = (doc?.clientName || '').toLowerCase();
      const email = (doc?.email_recipient || '').toLowerCase();

      return (
        docId.includes(term) ||
        title.includes(term) ||
        client.includes(term) ||
        email.includes(term)
      );
    });
  }, [allDocuments, globalFilter]);

  const filteredTotalCount = (globalFilter || '').trim()
    ? filteredDocuments.length
    : totalCount;

  // Fetch documents and templates on component mount
  useEffect(() => {
    dispatch(fetchDocuments({ page: 1, limit: 1000, search: '' }));
    dispatch(fetchTemplate({ all: true })); // Fetch all templates for dropdown
  }, [dispatch]);

  useEffect(() => {
    if (!showTemplateModal) return;
    if (templates && templates.length > 0) return;
    dispatch(fetchTemplate({ all: true }));
  }, [showTemplateModal, templates?.length, dispatch]);

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

  // Upload PDF handlers
  const handleOpenUploadModal = (documentId) => {
    setUploadingDocumentId(documentId);
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setUploadingDocumentId(null);
  };

  const handleUploadPdf = async (file) => {
    if (!uploadingDocumentId) {
      toast.error('No document selected for upload');
      return;
    }

    if (!file) {
      toast.error('No file selected');
      return;
    }

    try {
      setUploadLoading(true);

      // Create FormData to send file
      const formData = new FormData();
      formData.append('pdf_file', file);
      
      console.log('Uploading PDF:', {
        documentId: uploadingDocumentId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      await dispatch(uploadPdfToCloudinary({ 
        id: uploadingDocumentId, 
        file: formData 
      })).unwrap();

      toast.success('PDF uploaded successfully!');
      handleCloseUploadModal();
      
      // Refresh documents list
      dispatch(fetchDocuments({ page: currentPage, limit: pageSize, search: globalFilter }));
    } catch (error) {
      console.error('Full error uploading PDF:', error);
      const errorMessage = error?.message || error?.error || error || 'Failed to upload PDF';
      toast.error(errorMessage);
    } finally {
      setUploadLoading(false);
    }
  };

  // Email handlers
  const handleOpenEmailModal = (documentId) => {
    setEmailingDocumentId(documentId);
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setEmailingDocumentId(null);
  };

  const handleSendEmail = async (emailData) => {
    if (!emailingDocumentId) {
      toast.error('No document selected for email');
      return;
    }

    // Find the document to check if PDF exists
    const document = documents.find(doc => doc._id === emailingDocumentId || doc.id === emailingDocumentId);
    
    // Check if PDF file exists
    if (!document?.pdf_file || document.pdf_file.trim() === '') {
      toast.error('Please upload a PDF file first before sending email');
      handleCloseEmailModal();
      return;
    }

    try {
      setEmailLoading(true);

      console.log('Sending email:', {
        documentId: emailingDocumentId,
        emailRecipient: emailData.email_recipient,
        pdfUrl: document.pdf_file
      });

      await dispatch(sendEmailWithDocument({ 
        id: emailingDocumentId, 
        email: emailData 
      })).unwrap();

      toast.success('Email sent successfully!');
      handleCloseEmailModal();
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage = error?.message || error?.error || error || 'Failed to send email';
      toast.error(errorMessage);
    } finally {
      setEmailLoading(false);
    }
  };

  // Get the document title for the upload modal
  const uploadingDocument = allDocuments.find(doc => doc._id === uploadingDocumentId || doc.id === uploadingDocumentId);
  
  // Get the document for email modal
  const emailingDocument = allDocuments.find(doc => doc._id === emailingDocumentId || doc.id === emailingDocumentId);

  return {
    documents: filteredDocuments,
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
    totalCount: filteredTotalCount,
    totalPages,
    handlePageChange,
    // Upload PDF
    showUploadModal,
    handleOpenUploadModal,
    handleCloseUploadModal,
    handleUploadPdf,
    uploadLoading,
    uploadingDocument,
    // Email
    showEmailModal,
    handleOpenEmailModal,
    handleCloseEmailModal,
    handleSendEmail,
    emailLoading,
    emailingDocument,
  };
}
