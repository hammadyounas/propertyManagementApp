import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { fetchDocuments, deleteDocument, uploadPdfToCloudinary, sendEmailWithDocument } from '../../../store/features/documents/documentSlice';
import { selectDocuments, selectLoading, selectTotalCount } from '../../../store/features/documents/documentSelectors';

// Design Document 2 listing (TinyMCE-based documents)
// Reuses documents API, but filters documents created via this flow (editorType === 'tinymce')

export default function useDesignListing2() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const documents = useSelector(selectDocuments);
  const loading = useSelector(selectLoading);
  const totalCount = useSelector(selectTotalCount);

  // Local state
  const [templates2, setTemplates2] = useState([]);
  const [selectedTemplateFile, setSelectedTemplateFile] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
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

  // For now, show all documents from backend on Design Documents 2 page.
  // (If backend starts returning editorType, we can filter here.)
  const designDocs2 = useMemo(() => allDocuments, [allDocuments]);

  const filteredDocuments = useMemo(() => {
    const term = (globalFilter || '').trim().toLowerCase();
    if (!term) return designDocs2;

    return designDocs2.filter((doc) => {
      const docId = (doc?.doc_id || doc?.docId || doc?.id || '').toString().toLowerCase();
      const title = (doc?.title || '').toLowerCase();
      const email = (doc?.email_recipient || '').toLowerCase();
      const createdBy = (doc?.created_by?.name || '').toLowerCase();

      return (
        docId.includes(term) ||
        title.includes(term) ||
        email.includes(term) ||
        createdBy.includes(term)
      );
    });
  }, [designDocs2, globalFilter]);

  // Always base total count on the filtered list for this page,
  // not on the global documents total (which may include other types).
  const filteredTotalCount = filteredDocuments.length;

  // Fetch documents and Templates 2 list on mount
  useEffect(() => {
    dispatch(fetchDocuments({ page: 1, limit: 1000, search: '' }));
    fetchTemplates2();
  }, [dispatch]);

  const fetchTemplates2 = async () => {
    try {
      const res = await axios.get('/api/templates-2/list');
      const list = res?.data?.templates || [];
      // Map to shape expected by TemplateSelectionModal
      setTemplates2(
        list.map((t) => ({
          _id: t.fileName,
          id: t.fileName,
          title: t.name || t.fileName.replace('.html', ''),
        }))
      );
    } catch (err) {
      console.error('Failed to load Templates 2 list', err);
      toast.error('Failed to load Templates 2 for Design Document 2');
    }
  };

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
    router.push(`/design-documents-2/edit/${document._id || document.id}`);
  };

  const handleDelete = async ({ documentId } = {}) => {
    try {
      setDeleteLoading(true);
      const targetId = documentId ?? currentItem;
      await dispatch(deleteDocument(targetId)).unwrap();
      toast.success('Document deleted successfully.');
      closeDeleteModal();
      dispatch(fetchDocuments({ page: 1, limit: 1000, search: '' }));
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error deleting document!');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDuplicate = async (document) => {
    // For now, just navigate to edit with same ID; deeper duplicate support can be added later
    handleEdit(document);
  };

  // Template modal
  const openTemplateModal = () => {
    setShowTemplateModal(true);
  };

  const closeTemplateModal = () => {
    setShowTemplateModal(false);
    setSelectedTemplateFile('');
  };

  const handleCreateWithTemplate = (templateFile) => {
    const file = templateFile || selectedTemplateFile;
    if (!file) {
      toast.error('Please select a template first');
      return;
    }
    closeTemplateModal();
    router.push(`/design-documents-2/create?templateFile=${encodeURIComponent(file)}`);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  // Pagination for UI (client-side since we already fetched many)
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredTotalCount / pageSize);

  const generatePdfBlobFromContent = async (doc) => {
    if (!doc?.content) {
      throw new Error('No content available for this document');
    }

    let contentToUse = doc.content;
    if (contentToUse.includes('<body>')) {
      const bodyMatch = contentToUse.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        contentToUse = bodyMatch[1];
      }
    }

    const tempDiv = window.document.createElement('div');
    tempDiv.id = 'pdf-export-container';
    tempDiv.style.position = 'fixed';
    tempDiv.style.left = '-10000px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.maxWidth = '800px';
    tempDiv.style.margin = '40px auto';
    tempDiv.style.padding = '40px';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.fontFamily = 'Calibri, Arial, sans-serif';
    tempDiv.style.fontSize = '14px';
    tempDiv.style.color = '#333';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.style.boxSizing = 'border-box';
    tempDiv.style.overflow = 'visible';
    tempDiv.style.direction = 'ltr';
    tempDiv.style.boxShadow = '0 0 0 1px #e5e7eb';

    const styleTag = window.document.createElement('style');
    styleTag.id = 'pdf-export-styles';
    styleTag.textContent = `
      #pdf-export-container {
        direction: ltr !important;
        unicode-bidi: normal !important;
      }
      #pdf-export-container p {
        direction: ltr !important;
        unicode-bidi: normal !important;
        margin: 0 0 8px 0;
      }
      #pdf-export-container p[style*="text-align:center"] {
        text-align: center !important;
      }
      #pdf-export-container p[style*="text-align:right"] {
        text-align: right !important;
      }
      #pdf-export-container p[style*="text-align:justify"] {
        text-align: justify !important;
      }
      #pdf-export-container table {
        border-collapse: collapse;
        width: 100%;
      }
      #pdf-export-container table, 
      #pdf-export-container th, 
      #pdf-export-container td {
        border: 1px solid #d1d5db;
      }
      #pdf-export-container th, 
      #pdf-export-container td {
        padding: 6px 8px;
      }
      #pdf-export-container ul, 
      #pdf-export-container ol {
        margin: 0;
        padding-left: 20px;
      }
      #pdf-export-container li {
        margin: 4px 0;
      }
      #pdf-export-container .page-break {
        page-break-after: always !important;
        border-top: 2px dashed #d1d5db;
        margin: 30px 0;
        padding: 15px 0;
        text-align: center;
        color: #9ca3af;
        font-size: 12px;
      }
    `;
    window.document.head.appendChild(styleTag);

    tempDiv.innerHTML = contentToUse;
    window.document.body.appendChild(tempDiv);

    const height = tempDiv.offsetHeight;
    const width = tempDiv.offsetWidth;

    if (!tempDiv.innerHTML || tempDiv.innerHTML.trim() === '') {
      throw new Error('Content is empty');
    }

    if (height === 0 || width === 0) {
      throw new Error('Element has zero dimensions - cannot generate PDF');
    }

    const opt = {
      margin: [0, 0, 0, 0],
      filename: doc.doc_id
        ? `Doc_ID_${doc.doc_id}.pdf`
        : `${doc.title || 'Document'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        removeContainer: false,
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
      },
      pagebreak: {
        mode: ['css', 'legacy'],
        before: '.page-break',
        after: '.page-break',
        avoid: ['img', '.no-break'],
      },
    };

    const blob = await html2pdf().from(tempDiv).set(opt).outputPdf('blob');

    if (tempDiv.parentNode) {
      window.document.body.removeChild(tempDiv);
    }
    const existingStyle = window.document.getElementById('pdf-export-styles');
    if (existingStyle) {
      window.document.head.removeChild(existingStyle);
    }

    return blob;
  };

  const uploadPdfAndGetUrl = async (doc, blob) => {
    const pdfFileName = doc.doc_id
      ? `Doc_ID_${doc.doc_id}.pdf`
      : `${doc.title || 'Document'}.pdf`;
    const formData = new FormData();
    const pdfFile = new File([blob], pdfFileName, { type: 'application/pdf' });
    formData.append('pdf_file', pdfFile);

    const result = await dispatch(
      uploadPdfToCloudinary({
        id: doc._id || doc.id,
        file: formData,
      })
    ).unwrap();

    await dispatch(fetchDocuments({ page: 1, limit: 1000, search: '' }));

    return result?.pdf_file || result?.pdfFile;
  };

  const downloadFromUrl = (url, doc) => {
    if (!url) return;
    const fileName = doc.doc_id
      ? `Doc_ID_${doc.doc_id}.pdf`
      : `${doc.title || 'Document'}.pdf`;
    const link = window.document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleDownload = async (doc) => {
    try {
      if (doc?.pdf_file && doc.pdf_file.trim() !== '') {
        downloadFromUrl(doc.pdf_file, doc);
        return;
      }

      const blob = await generatePdfBlobFromContent(doc);
      const uploadedUrl = await uploadPdfAndGetUrl(doc, blob);
      if (uploadedUrl) {
        downloadFromUrl(uploadedUrl, doc);
        toast.success('PDF generated and downloaded');
      } else {
        toast.error('Failed to retrieve PDF link after upload');
      }
    } catch (err) {
      console.error('Failed to download PDF', err);
      toast.error('Failed to download PDF');
    }
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

      const formData = new FormData();
      formData.append('pdf_file', file);

      await dispatch(
        uploadPdfToCloudinary({
          id: uploadingDocumentId,
          file: formData,
        })
      ).unwrap();

      toast.success('PDF uploaded successfully!');
      handleCloseUploadModal();
      dispatch(fetchDocuments({ page: 1, limit: 1000, search: '' }));
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

    const document = documents.find(
      (doc) => doc._id === emailingDocumentId || doc.id === emailingDocumentId
    );

    let pdfUrl = document?.pdf_file;

    if (!pdfUrl || pdfUrl.trim() === '') {
      try {
        const blob = await generatePdfBlobFromContent(document);
        pdfUrl = await uploadPdfAndGetUrl(document, blob);
        if (!pdfUrl) {
          toast.error('PDF upload failed, email cancelled.');
          return;
        }
      } catch (err) {
        console.error('Failed to prepare PDF for email', err);
        toast.error('PDF generate/upload fail hua, email cancel.');
        return;
      }
    }

    try {
      setEmailLoading(true);

      await dispatch(
        sendEmailWithDocument({
          id: emailingDocumentId,
          email: emailData,
        })
      ).unwrap();

      toast.success('Email sent successfully!');
      handleCloseEmailModal();
      dispatch(fetchDocuments({ page: 1, limit: 1000, search: '' }));
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage = error?.message || error?.error || error || 'Failed to send email';
      toast.error(errorMessage);
    } finally {
      setEmailLoading(false);
    }
  };

  // Active document references for modals
  const uploadingDocument = allDocuments.find(
    (doc) => doc._id === uploadingDocumentId || doc.id === uploadingDocumentId
  );

  const emailingDocument = allDocuments.find(
    (doc) => doc._id === emailingDocumentId || doc.id === emailingDocumentId
  );

  return {
    documents: paginatedDocuments,
    loading,
    globalFilter,
    setGlobalFilter,
    handleEdit,
    handleDelete,
    handleDuplicate,
    openDeleteModal,
    closeDeleteModal,
    showDeleteModal,
    deleteLoading,
    // Template selection
    templates: templates2,
    selectedTemplateId: selectedTemplateFile,
    setSelectedTemplateId: setSelectedTemplateFile,
    showTemplateModal,
    openTemplateModal,
    closeTemplateModal,
    handleCreateWithTemplate,
    // Pagination
    currentPage: currentPage - 1,
    pageSize,
    totalCount: filteredTotalCount,
    totalPages,
    handlePageChange,
    // Download
    handleDownload,
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

