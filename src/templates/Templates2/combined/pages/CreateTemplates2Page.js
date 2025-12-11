import useTemplates2Editor from '../../functional/useTemplates2Editor';
import Templates2EditorUI from '../../ui/Templates2EditorUI';

export default function CreateTemplates2Page() {
  const {
    title,
    setTitle,
    htmlContent,
    setHtmlContent,
    loading,
    handleSave,
    handleBack,
    editorRef,
    showSaveModal,
    setShowSaveModal,
    templateName,
    setTemplateName,
    performSave,
    handleCancelSave,
  } = useTemplates2Editor();

  return (
    <Templates2EditorUI
      title={title}
      setTitle={setTitle}
      htmlContent={htmlContent}
      setHtmlContent={setHtmlContent}
      loading={loading}
      onSave={handleSave}
      onBack={handleBack}
      editorRef={editorRef}
      showSaveModal={showSaveModal}
      setShowSaveModal={setShowSaveModal}
      templateName={templateName}
      setTemplateName={setTemplateName}
      performSave={performSave}
      handleCancelSave={handleCancelSave}
    />
  );
}

