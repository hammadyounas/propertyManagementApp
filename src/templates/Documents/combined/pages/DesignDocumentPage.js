import React from 'react'
import CreateDesignDocumentUI from '../../ui/organisms/CreateDesignDocumentUI'
import useDesignDocument from '../../functional/useDesignDocument'
import { useRouter } from 'next/router'

export default function DesignDocumentPage() {
  const router = useRouter()
  const idFromQuery = router.query?.id
  const templateFromQuery = router.query?.template
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
    // Email modal props
    showEmailModal,
    emailLoading,
    handleCloseEmailModal,
    handleSendEmailWithPDF,
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
      onBack={() => router.push('/documents')}
      // Email modal props
      showEmailModal={showEmailModal}
      emailLoading={emailLoading}
      onCloseEmailModal={handleCloseEmailModal}
      onSendEmailWithPDF={handleSendEmailWithPDF}
    />
  )
}
