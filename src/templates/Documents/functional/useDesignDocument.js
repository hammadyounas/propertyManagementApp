import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import html2pdf from 'html2pdf.js'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

export default function useDesignDocument(initialDocumentId, templateIdFromQuery) {
  const [templates, setTemplates] = useState([])
  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [clientName, setClientName] = useState('')
  const [loading, setLoading] = useState(false)
  const [editorValue, setEditorValue] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [docTitle, setDocTitle] = useState('')
  const [editingId, setEditingId] = useState('')
  const router = useRouter()

  // Load templates
  useEffect(() => {
    try {
      const savedTemplates = localStorage.getItem('propertyTemplates')
      if (savedTemplates) {
        const parsed = JSON.parse(savedTemplates)
        setTemplates(parsed)
      }
    } catch (e) {
      console.error('Failed to load templates', e)
    }
  }, [])

  // Set template from URL query if provided
  useEffect(() => {
    if (templateIdFromQuery && !editingId) {
      setSelectedTemplateId(templateIdFromQuery)
    }
  }, [templateIdFromQuery, editingId])

  // If editing existing document, load it
  useEffect(() => {
    if (!initialDocumentId) return
    try {
      setLoading(true)
      const saved = localStorage.getItem('designDocuments')
      if (!saved) return
      const docs = JSON.parse(saved)
      const existing = docs.find(d => d.id === initialDocumentId)
      if (existing) {
        setEditingId(existing.id)
        setSelectedTemplateId(existing.templateId || '')
        setEditorValue(existing.content || '')
        setClientName(existing.clientName || '')
        setDocumentId(existing.documentId || uuidv4())
        setDocTitle(existing.title || '')
      }
    } catch (e) {
      console.error('Failed to load document for editing', e)
    } finally {
      setLoading(false)
    }
  }, [initialDocumentId])

  const selectedTemplate = useMemo(() => {
    return templates.find(t => t.id === selectedTemplateId) || null
  }, [templates, selectedTemplateId])

  useEffect(() => {
    if (selectedTemplate) {
      setEditorValue(selectedTemplate.content || '')
      setDocumentId(uuidv4())
      setDocTitle(selectedTemplate.title || '')
    } else {
      setEditorValue('')
      setDocumentId('')
      setDocTitle('')
    }
  }, [selectedTemplateId])

  const regenerateDocumentId = () => setDocumentId(uuidv4())

  const handleDownload = async () => {
    if (!selectedTemplate) {
      toast.error('Please select a template')
      return
    }
    setLoading(true)
    try {
      const container = document.createElement('div')
      container.style.padding = '24px'
      container.style.background = '#ffffff'
      const headerHtml = `
        <div style="margin-bottom:12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          ${documentId ? `<div style=\"font-size:12px;color:#444;\"><strong>Document ID:</strong> ${documentId}</div>` : ''}
          ${clientName ? `<div style=\"font-size:12px;color:#444;\"><strong>Client:</strong> ${clientName}</div>` : ''}
        </div>
      `
      container.innerHTML = headerHtml + (editorValue || '')
      document.body.appendChild(container)

      const safeName = `${(docTitle || selectedTemplate.title || 'document').replace(/[^a-z0-9-_ ]/gi,'_')}.pdf`

      try {
        const res = await fetch('/styles/pdf-styles.css')
        if (res.ok) {
          const css = await res.text()
          const styleEl = document.createElement('style')
          styleEl.type = 'text/css'
          styleEl.appendChild(document.createTextNode(css))
          container.prepend(styleEl)
        }
      } catch {}

      const opt = {
        margin:       [10, 10, 10, 10],
        filename:     safeName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      await html2pdf().set(opt).from(container).save()
      toast.success('PDF download started')

      document.body.removeChild(container)
    } catch (e) {
      console.error(e)
      toast.error('Failed to generate PDF')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template')
      return
    }
    if (!clientName.trim()) {
      toast.error('Please enter client name')
      return
    }
    toast.info(`Pretending to send email to ${clientName} with template "${docTitle || selectedTemplate.title || ''}" (Document ID: ${documentId || 'N/A'})`)
  }

  const handleSaveDocument = () => {
    if (!editorValue.trim()) {
      toast.error('Nothing to save. Please edit content first.')
      return
    }
    try {
      const saved = localStorage.getItem('designDocuments')
      const docs = saved ? JSON.parse(saved) : []

      if (editingId) {
        const next = docs.map(d =>
          d.id === editingId
            ? {
                ...d,
                templateId: selectedTemplateId || d.templateId || null,
                title: docTitle || d.title || 'Untitled Document',
                content: editorValue,
                clientName: clientName || '',
                documentId: documentId || d.documentId || uuidv4(),
                updatedAt: new Date().toISOString(),
              }
            : d
        )
        localStorage.setItem('designDocuments', JSON.stringify(next))
        toast.success('Document updated')
        router.push('/documents')
        return editingId
      } else {
        const newDoc = {
          id: uuidv4(),
          templateId: selectedTemplateId || null,
          title: docTitle || (selectedTemplate && selectedTemplate.title) || 'Untitled Document',
          content: editorValue,
          clientName: clientName || '',
          documentId: documentId || uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        const next = [newDoc, ...docs]
        localStorage.setItem('designDocuments', JSON.stringify(next))
        toast.success('Document saved')
        router.push('/documents')
        return newDoc.id
      }
    } catch (e) {
      console.error('Failed to save document', e)
      toast.error('Failed to save document')
    }
  }

  return {
    templates,
    selectedTemplateId,
    setSelectedTemplateId,
    clientName,
    setClientName,
    loading,
    handleDownload,
    handleSendEmail,
    selectedTemplate,
    editorValue,
    setEditorValue,
    documentId,
    regenerateDocumentId,
    docTitle,
    setDocTitle,
    handleSaveDocument,
  }
}

