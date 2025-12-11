import React, { useRef } from "react";
import { useRouter } from "next/router";
import useDesignDocument2 from "../../functional/useDesignDocument2";
import CreateDesignDocument2UI from "../../ui/organisms/CreateDesignDocument2UI";

export default function DesignDocument2Page({ documentId: documentIdProp }) {
  const router = useRouter();
  const idFromQuery = documentIdProp || router.query?.id || null;
  const editorRef = useRef(null);

  const {
    documentId,
    title,
    setTitle,
    htmlContent,
    setHtmlContent,
    recipientEmail,
    setRecipientEmail,
    loading,
    handleSave,
    handleDownload,
    handleBack,
  } = useDesignDocument2(idFromQuery, editorRef);

  return (
    <CreateDesignDocument2UI
      documentId={documentId}
      title={title}
      setTitle={setTitle}
      htmlContent={htmlContent}
      setHtmlContent={setHtmlContent}
      recipientEmail={recipientEmail}
      setRecipientEmail={setRecipientEmail}
      loading={loading}
      onSave={handleSave}
      onDownload={handleDownload}
      onBack={handleBack}
      editorRef={editorRef}
    />
  );
}


