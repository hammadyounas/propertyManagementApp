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
    handleDownload,
    handleSendEmail,
    editorValue,
    setEditorValue,
    documentId,
    regenerateDocumentId,
    docTitle,
    setDocTitle,
    handleSaveDocument,
  } = useDesignDocument(idFromQuery, templateFromQuery)

  return (
    <CreateDesignDocumentUI
      clientName={clientName}
      setClientName={setClientName}
      loading={loading}
      onDownload={handleDownload}
      onSendEmail={handleSendEmail}
      editorValue={editorValue}
      setEditorValue={setEditorValue}
      documentId={documentId}
      onRegenerateId={regenerateDocumentId}
      docTitle={docTitle}
      setDocTitle={setDocTitle}
      onSave={handleSaveDocument}
      onBack={() => router.push('/documents')}
    />
  )
}
