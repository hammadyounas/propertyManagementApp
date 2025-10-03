import useTemplateList from '../../functional/useTemplateList';
import TemplateListUI from '../../ui/TemplateListUI';
import ConfirmDeleteModal from '../../../../components/ui/molecules/ConfirmDeleteModal';

export default function TemplateListPage() {
  const {
    templates,
    loading,
    globalFilter,
    setGlobalFilter,
    categoryFilter,
    setCategoryFilter,
    handleEdit,
    handleDelete,
    handleDuplicate,
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
  } = useTemplateList();

  return (
    <>
      <TemplateListUI
        templates={templates}
        loading={loading}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
        onDuplicate={handleDuplicate}
        router={router}
        // Pagination props
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        text="Are you sure you want to delete this template?"
        disabled={deleteLoading}
      />
    </>
  );
}
