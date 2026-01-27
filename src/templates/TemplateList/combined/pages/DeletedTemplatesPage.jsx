import useDeletedTemplates from '../../functional/useDeletedTemplates';
import DeletedTemplatesUI from '../../ui/DeletedTemplatesUI';
import ConfirmDeleteModal from '../../../../components/ui/molecules/ConfirmDeleteModal';

export default function DeletedTemplatesPage() {
  const {
    deletedTemplates,
    loading,
    globalFilter,
    setGlobalFilter,
    handleRestore,
    handleBack,
    currentItem,
    openRestoreModal,
    closeRestoreModal,
    showRestoreModal,
    restoreLoading,
    // Pagination props
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
    router,
  } = useDeletedTemplates();

  return (
    <>
      <DeletedTemplatesUI
        deletedTemplates={deletedTemplates}
        loading={loading}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onRestore={openRestoreModal}
        router={router}
        handleBack={handleBack}
        // Pagination props
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      
      <ConfirmDeleteModal
        isOpen={showRestoreModal}
        onClose={closeRestoreModal}
        onDelete={() => handleRestore({ templateId: currentItem })}
        text="Are you sure you want to restore this template?"
        disabled={restoreLoading}
        confirmText="Restore"
        cancelText="Cancel"
        title="Restore Template"
        iconColor="text-green-600"
        buttonColor="bg-green-600 hover:bg-green-700"
      />
    </>
  );
}
