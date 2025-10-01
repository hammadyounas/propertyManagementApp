import React from 'react'
import DocumentListingUI from '../../ui/organisms/DocumentListingUI'
import useDesignListing from '../../functional/useDesignListing';
import ConfirmDeleteModal from '../../../../components/ui/molecules/ConfirmDeleteModal';

export default function DocumentListing() {
    const {
        documents,
        loading,
        globalFilter,
        setGlobalFilter,
        categoryFilter,
        setCategoryFilter,
        handleEdit,
        handleDelete,
        handleDuplicate,
        currentItem,
        openDeleteModal,
        closeDeleteModal,
        showDeleteModal,
        deleteLoading,
        router,
      } = useDesignListing();
  return (
    <>
        <DocumentListingUI
        documents={documents}
        loading={loading}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
        onDuplicate={handleDuplicate}
        router={router}
        />

        <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => handleDelete({ documentId: currentItem })}
        text="Are you sure you want to delete this document?"
        disabled={deleteLoading}
      />
    </>
  )
}
