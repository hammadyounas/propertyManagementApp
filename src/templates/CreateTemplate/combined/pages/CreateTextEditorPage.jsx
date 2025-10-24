import useTextEditor from '../../functional/useTextEditor'
import TextEditorUI from '../../ui/TextEditorUI'

export default function CreateTextEditorPage({ templateId = null }) {
  const { 
    title, 
    setTitle, 
    editorValue, 
    setEditorValue, 
    category,
    setCategory,
    loading,
    handleSave,
    handleBack,
    isEdit,
    templateId: hookTemplateId,
    fileInputRef,
    handleTriggerImport,
    arrayBufferFromFile,
    textFromFile,
    handleImportFile,
    insertPlaceholder,
    showImportModal,
    setShowImportModal,
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleBrowseClick,
    // Full-screen
    isFullScreen,
    fullScreenRef,
    handleFullScreen,
  } = useTextEditor(templateId)
  
  return (
   <TextEditorUI
     title={title}
     setTitle={setTitle}
     editorValue={editorValue}
     setEditorValue={setEditorValue}
     category={category}
     setCategory={setCategory}
     loading={loading}
     onSave={handleSave}
     onBack={handleBack}
     isEdit={isEdit}
     templateId={hookTemplateId}
     fileInputRef={fileInputRef}
     handleTriggerImport={handleTriggerImport}
     arrayBufferFromFile={arrayBufferFromFile}
     textFromFile={textFromFile}
     handleImportFile={handleImportFile}
     insertPlaceholder={insertPlaceholder}
     showImportModal={showImportModal}
     setShowImportModal={setShowImportModal}
     isDragging={isDragging}
     handleDragEnter={handleDragEnter}
     handleDragLeave={handleDragLeave}
     handleDragOver={handleDragOver}
     handleDrop={handleDrop}
     handleBrowseClick={handleBrowseClick}
     // Full-screen
     isFullScreen={isFullScreen}
     fullScreenRef={fullScreenRef}
     handleFullScreen={handleFullScreen}
   />
  )
}
