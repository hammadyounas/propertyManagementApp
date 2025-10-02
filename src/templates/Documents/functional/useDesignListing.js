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

  // Load documents and templates from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
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
  
  const handleDownload = async (documentData) => {
    setLoading(true)
    try {
      const container = document.createElement('div')
      container.style.padding = '24px'
      container.style.background = '#ffffff'
      const headerHtml = `
        <div style="margin-bottom:12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          ${documentData.id ? `<div style=\"font-size:12px;color:#444;\"><strong>Document ID:</strong> ${documentData.id}</div>` : ''}
          ${documentData.clientName ? `<div style=\"font-size:12px;color:#444;\"><strong>Client:</strong> ${documentData.clientName}</div>` : ''}
        </div>
      `
      container.innerHTML = headerHtml + (documentData.content || '')
      document.body.appendChild(container)

      const safeName = `${(documentData.title || 'document').replace(/[^a-z0-9-_ ]/gi,'_')}.pdf`

      try {
        const res = await fetch('/styles/pdf-styles.css')
        if (res.ok) {
          const css = await res.text()
          const styleEl = document.createElement('style')
          styleEl.type = 'text/css'
          styleEl.appendChild(document.createTextNode(css))
          container.prepend(styleEl)
        }
      } catch {}

      const opt = {
        margin:       [10, 10, 10, 10],
        filename:     safeName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      await html2pdf().set(opt).from(container).save()
      toast.success('PDF download started')

      document.body.removeChild(container)
    } catch (e) {
      console.error(e)
      toast.error('Failed to generate PDF')
    } finally {
      setLoading(false)
    }
  }

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
    handleDuplicate,
    handleSave,
    handleBack,
    currentItem,
    openDeleteModal,
    closeDeleteModal,
    showDeleteModal,
    deleteLoading,
    router,
    handleDownload,
    handleOpenTemplateModal,
    handleCloseTemplateModal,
    handleCreateWithTemplate,
  };
}
