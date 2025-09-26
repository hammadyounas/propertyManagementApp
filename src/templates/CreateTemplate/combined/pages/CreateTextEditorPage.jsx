import useTextEditor from '../../functional/useTextEditor'
import TextEditorUI from '../../ui/TextEditorUI'

export default function CreateTextEditorPage() {
  const { title, setTitle, editorValue, setEditorValue } = useTextEditor()
  return (
   <TextEditorUI
     title={title}
     setTitle={setTitle}
     editorValue={editorValue}
     setEditorValue={setEditorValue}
   />
  )
}
