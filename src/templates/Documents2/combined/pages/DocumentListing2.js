import React from "react";
import useDesignListing2 from "../../functional/useDesignListing2";
import DocumentListingUI from "../../../Documents/ui/organisms/DocumentListingUI";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";

export default function DocumentListing2() {
  const {
    documents,
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
    // Templates 2 selection
    templates,
    selectedTemplateId,
    setSelectedTemplateId,
    showTemplateModal,
    openTemplateModal,
    closeTemplateModal,
    handleCreateWithTemplate,
    // Pagination
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
    // Download
    handleDownload,
    // Upload
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
  } = useDesignListing2();

  return (
    <>
      <DocumentListingUI
        documents={documents}
        loading={loading}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
        onDuplicate={handleDuplicate}
        router={null}
        onDownload={handleDownload}
        // Templates 2 for dropdown
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
        showTemplateModal={showTemplateModal}
        onOpenTemplateModal={openTemplateModal}
        onCloseTemplateModal={closeTemplateModal}
        onCreateWithTemplate={handleCreateWithTemplate}
        // Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        // Upload
        showUploadModal={showUploadModal}
        onOpenUploadModal={handleOpenUploadModal}
        onCloseUploadModal={handleCloseUploadModal}
        onUploadPdf={handleUploadPdf}
        uploadLoading={uploadLoading}
        uploadingDocument={uploadingDocument}
        // Email
        showEmailModal={showEmailModal}
        onOpenEmailModal={handleOpenEmailModal}
        onCloseEmailModal={handleCloseEmailModal}
        onSendEmail={handleSendEmail}
        emailLoading={emailLoading}
        emailingDocument={emailingDocument}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => handleDelete({ documentId: null })}
        text="Are you sure you want to delete this document?"
        disabled={deleteLoading}
      />
    </>
  );
}


