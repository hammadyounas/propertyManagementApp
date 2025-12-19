import React from 'react'
import CreateDesignDocumentUI from '../../ui/organisms/CreateDesignDocumentUI'
import useDesignDocument from '../../functional/useDesignDocument'
import { useRouter } from 'next/router'

export default function DesignDocumentPage({ documentId: documentIdProp, templateId: templateIdProp }) {
  const router = useRouter()
  // Use prop if provided, otherwise fallback to router query
  const idFromQuery = documentIdProp || router.query?.id
  const templateFromQuery = templateIdProp || router.query?.template
  const {
    templates,
    selectedTemplateId,
    setSelectedTemplateId,
    clientName,
    setClientName,
    loading,
    handleSendEmail,
    editorValue,
    setEditorValue,
    documentId,
    regenerateDocumentId,
    docTitle,
    setDocTitle,
    handleSaveDocument,
    handleSaveOnly,
    isEditing,
    // Email modal props
    showEmailModal,
    emailLoading,
    handleCloseEmailModal,
    handleSendEmailWithPDF,
    // Full-screen props
    isFullScreen,
    fullScreenRef,
    handleFullScreen,
  } = useDesignDocument(idFromQuery, templateFromQuery)

  return (
    <CreateDesignDocumentUI
      clientName={clientName}
      setClientName={setClientName}
      loading={loading}
      editorValue={editorValue}
      setEditorValue={setEditorValue}
      documentId={documentId}
      onRegenerateId={regenerateDocumentId}
      docTitle={docTitle}
      setDocTitle={setDocTitle}
      onSave={handleSaveDocument}
      onSaveOnly={handleSaveOnly}
      onBack={() => router.push('/documents')}
      isEditing={isEditing}
      // Email modal props
      showEmailModal={showEmailModal}
      emailLoading={emailLoading}
      onCloseEmailModal={handleCloseEmailModal}
      onSendEmailWithPDF={handleSendEmailWithPDF}
      // Full-screen props
      isFullScreen={isFullScreen}
      fullScreenRef={fullScreenRef}
      handleFullScreen={handleFullScreen}
    />
  )
}
