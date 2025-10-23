import React from 'react'
import DocumentListingUI from '../../ui/organisms/DocumentListingUI'
import useDesignListing from '../../functional/useDesignListing';
import ConfirmDeleteModal from '../../../../components/ui/molecules/ConfirmDeleteModal';

export default function DocumentListing() {
    const {
        documents,
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
        // Pagination props
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        handlePageChange,
        // Upload PDF props
        showUploadModal,
        handleOpenUploadModal,
        handleCloseUploadModal,
        handleUploadPdf,
        uploadLoading,
        uploadingDocument,
      } = useDesignListing();
  return (
    <>
        <DocumentListingUI
        documents={documents}
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
        showTemplateModal={showTemplateModal}
        loading={loading}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
        onDuplicate={handleDuplicate}
        router={router}
        onDownload={handleDownload}
        onOpenTemplateModal={handleOpenTemplateModal}
        onCloseTemplateModal={handleCloseTemplateModal}
        onCreateWithTemplate={handleCreateWithTemplate}
        // Pagination props
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        // Upload PDF props
        showUploadModal={showUploadModal}
        onOpenUploadModal={handleOpenUploadModal}
        onCloseUploadModal={handleCloseUploadModal}
        onUploadPdf={handleUploadPdf}
        uploadLoading={uploadLoading}
        uploadingDocument={uploadingDocument}
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
