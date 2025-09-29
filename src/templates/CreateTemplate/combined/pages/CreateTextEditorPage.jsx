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
    templateId: hookTemplateId
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
   />
  )
}
