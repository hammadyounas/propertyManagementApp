import { useState } from 'react'

export default function useTextEditor() {
  const [title, setTitle] = useState('')
  const [editorValue, setEditorValue] = useState('')

  return {
    title,
    setTitle,
    editorValue,
    setEditorValue,
  }
}