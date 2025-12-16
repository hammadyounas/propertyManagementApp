import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function useTemplates2List() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch templates from API
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/templates-2/list');
      setTemplates(response.data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleEdit = (fileName) => {
    router.push(`/templates-2/edit?file=${encodeURIComponent(fileName)}`);
  };

  const handleDelete = async (fileName) => {
    if (!fileName) {
      toast.error('Template file name is missing');
      return;
    }

    if (window.confirm('Are you sure you want to delete this template?')) {
      setLoading(true);
      try {
        const response = await axios.delete(`/api/templates-2/delete?fileName=${encodeURIComponent(fileName)}`);
        
        if (response.data && response.data.success) {
          toast.success('Template deleted successfully');
          // Refresh list after successful deletion
          await fetchTemplates();
        } else {
          toast.error('Failed to delete template');
        }
      } catch (error) {
        console.error('Error deleting template:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Failed to delete template';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDuplicate = (template) => {
    const newFileName = `${template.name} (Copy).html`;
    router.push(`/templates-2/create?duplicate=${encodeURIComponent(template.fileName)}&newName=${encodeURIComponent(newFileName)}`);
  };

  // Filter templates based on search
  const normalizedFilter = (globalFilter || '').toString().toLowerCase().trim();
  const filteredTemplates = templates.filter((template) => {
    const name = (template && template.name ? template.name : '').toString().toLowerCase();

    if (!normalizedFilter) return true;

    return name.includes(normalizedFilter);
  });

  // Pagination logic
  const totalCount = filteredTemplates.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  return {
    templates: paginatedTemplates,
    loading,
    globalFilter,
    setGlobalFilter,
    handleEdit,
    handleDelete,
    handleDuplicate,
    router,
    currentPage: currentPage - 1, // Convert to 0-based for UI
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
  };
}

