import React from 'react'
import DeletedDocumentsUI from '../../ui/organisms/DeletedDocumentsUI'
import useDeletedDocuments from '../../functional/useDeletedDocuments';
import ConfirmDeleteModal from '../../../../components/ui/molecules/ConfirmDeleteModal';

export default function DeletedDocumentsPage() {
    const {
        deletedDocuments,
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
      } = useDeletedDocuments();
  return (
    <>
        <DeletedDocumentsUI
        deletedDocuments={deletedDocuments}
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
        onDelete={() => handleRestore({ documentId: currentItem })}
        text="Are you sure you want to restore this document?"
        disabled={restoreLoading}
        confirmText="Restore"
        cancelText="Cancel"
        title="Restore Document"
        iconColor="text-green-600"
        buttonColor="bg-green-600 hover:bg-green-700"
      />
    </>
  )
}
