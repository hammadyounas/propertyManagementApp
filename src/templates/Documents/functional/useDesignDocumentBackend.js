// Alternative implementation with backend PDF generation
const handleSendEmailWithPDF = async (emailData) => {
  setEmailLoading(true)
  try {
    // Send document data to backend for PDF generation
    const response = await fetch('/api/send-email-with-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailData.email,
        subject: emailData.subject,
        message: emailData.message,
        documentTitle: docTitle || 'Document',
        documentContent: editorValue, // Send HTML content to backend
        templateId: selectedTemplateId,
        clientName: clientName,
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    const result = await response.json()
    toast.success(`Email sent successfully to ${emailData.email}`)
    setShowEmailModal(false)
  } catch (error) {
    console.error('Error sending email:', error)
    toast.error('Failed to send email. Please try again.')
  } finally {
    setEmailLoading(false)
  }
}
