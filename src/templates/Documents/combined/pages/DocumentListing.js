import React from 'react'
import DocumentListingUI from '../../ui/organisms/DocumentListingUI'
import useDesignListing from '../../functional/useDesignListing';
import ConfirmDeleteModal from '../../../../components/ui/molecules/ConfirmDeleteModal';

export default function DocumentListing() {
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
      } = useDesignListing();
  return (
    <>
        <DocumentListingUI
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
        />

        <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        text="Are you sure you want to delete this template?"
        disabled={deleteLoading}
      />
    </>
  )
}
