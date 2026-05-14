import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  clearTemplateError
} from '../../../store/features/templates/templateSlice';
import {
  selectTemplates,
  selectTemplateLoading,
  selectTemplateError,
  selectTemplateCreateSuccess,
  selectTemplatesTotalCount,
  selectTemplateById
} from '../../../store/features/templates/templateSelectors';
import { AppRoutes, templateEditPath } from '@/constants/appRoutes';

export default function useTemplateList() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux state
  const templates = useSelector(selectTemplates);
  const loading = useSelector(selectTemplateLoading);
  const error = useSelector(selectTemplateError);
  const createSuccess = useSelector(selectTemplateCreateSuccess);
  const totalCount = useSelector(selectTemplatesTotalCount);
  const template = useSelector(selectTemplateById);
  // Local state
  const [globalFilter, setGlobalFilter] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch templates on component mount
  useEffect(() => {
    dispatch(fetchTemplate({
      search: globalFilter,
      page: currentPage,
      limit: pageSize
    }));
  }, [dispatch, globalFilter, currentPage, pageSize]);

  // Handle success/error states
  useEffect(() => {
    if (createSuccess) {
      toast.success('Template created successfully!');
      dispatch(clearTemplateError());
    }
  }, [createSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTemplateError());
    }
  }, [error, dispatch]);

  // Modal handlers
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (templateId) => {
    setCurrentItem(templateId);
    setShowDeleteModal(true);
  };

  const handleEdit = (id) => {
    router.push(templateEditPath(id));
  };


  const handleDelete = async ({ templateId }) => {
    try {
      const targetId = templateId ?? currentItem;
      await dispatch(deleteTemplate(targetId)).unwrap();
      closeDeleteModal();
      toast.success('Template deleted successfully.');
      dispatch(fetchTemplate({
        search: globalFilter,
        page: currentPage,
        limit: pageSize
      }));
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Error deleting template!');
    }
  };
  

  const handleDuplicate = async (template) => {
    try {
      const duplicatedTemplate = {
        title: `${template.title} (Copy)`,
        content: template.content,
        // Remove the original ID so server can generate a new one
        // Don't include _id, id, or any other ID fields
      };
      
      await dispatch(createTemplate(duplicatedTemplate)).unwrap();
      toast.success('Template duplicated successfully.');
      dispatch(fetchTemplate({
        search: globalFilter,
        page: currentPage,
        limit: pageSize
      }));
    } catch (error) {
      console.error('Error duplicating template:', error);
      toast.error('Error duplicating template!');
    }
  };

  const handleSave = async (templateData) => {
    try {
      if (templateData._id) {
        // Update existing template
        await dispatch(updateTemplate({ 
          id: templateData._id, 
          data: templateData 
        })).unwrap();
        toast.success('Template updated successfully.');
      } else {
        // Create new template
        await dispatch(createTemplate(templateData)).unwrap();
        toast.success('Template created successfully.');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Error saving template!');
    }
  };

  const handleBack = () => {
    router.push(AppRoutes.TEMPLATES);
  };

  // No filtering needed - Redux handles search
  const filteredTemplates = templates;

  // Pagination logic
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1); // Convert to 1-based indexing
  };

  return {
    templates: filteredTemplates,
    loading,
    globalFilter,
    setGlobalFilter,
    handleEdit,
    handleDelete,
    handleDuplicate,
    handleSave,
    handleBack,
    openDeleteModal,
    closeDeleteModal,
    showDeleteModal,
    deleteLoading: loading,
    router,
    // Pagination props
    currentPage: currentPage - 1, // Convert to 0-based indexing for UI
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
  };
}
