import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import {
  fetchDocumentById,
  createDocument,
  updateDocument,
  uploadPdfToCloudinary,
} from '../../../store/features/documents/documentSlice';

// Generate a random 6-digit unique ID
const generateDocId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default function useDesignDocument2(initialDocumentId = null, editorRef = null) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state
  const [documentId, setDocumentId] = useState(generateDocId());
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Read templateFile from query for new documents
  useEffect(() => {
    const { templateFile } = router.query || {};

    if (initialDocumentId) {
      // Editing existing document
      loadExistingDocument(initialDocumentId);
    } else if (templateFile) {
      // Creating from Templates 2 HTML file
      loadTemplateFile(templateFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, initialDocumentId]);

  const loadExistingDocument = async (id) => {
    try {
      setLoading(true);
      const doc = await dispatch(fetchDocumentById(id)).unwrap();
      if (doc) {
        setEditingId(doc._id || doc.id);
        setTitle(doc.title || '');
        setHtmlContent(doc.content || '');
        setRecipientEmail(doc.email_recipient || '');
        setDocumentId(doc.doc_id || generateDocId());
      }
    } catch (error) {
      console.error('Failed to load Design Document 2 for editing', error);
      toast.error('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const loadTemplateFile = async (fileName) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/templates-2/get?fileName=${encodeURIComponent(fileName)}`);
      let content = res?.data?.content || '';

      // Extract body content if it's wrapped in HTML tags
      if (content.includes('<body>')) {
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
          content = bodyMatch[1];
        }
      }

      // Remove legacy auto-page-break divs jo PDF se import hoke aa rahe hain
      // Ye hi tumhari blank white pages ka main reason hain
      content = content.replace(
        /<div[^>]*class=["']auto-page-break["'][^>]*>[\s\S]*?<\/div>/gi,
        ''
      );

      // Inject document ID into placeholder if present
      if (content && documentId) {
        content = content.replace(/{{document_id}}/g, documentId);
        content = content.replace(/Doc_Id/g, `Doc Id: ${documentId}`);
      }
      setHtmlContent(content);

      // Title ab sirf template file ke naam se aayega,
      // HTML ke andar kisi heading se auto-fill nahi hoga
      setTitle(fileName.replace('.html', ''));
    } catch (error) {
      console.error('Failed to load Templates 2 file for Design Document 2', error);
      toast.error('Failed to load selected template');
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async ({ redirectToList = true } = {}) => {
    if (!htmlContent || !htmlContent.trim()) {
      toast.error('Nothing to save. Please add content first.');
      return null;
    }

    const MAX_RETRIES = 5;
    let retryCount = 0;

    while (retryCount <= MAX_RETRIES) {
      try {
        setLoading(true);

        const documentData = {
          title: title || 'Untitled Document',
          content: htmlContent,
          email_recipient: recipientEmail || '',
          doc_id: documentId || generateDocId(),
          editorType: 'tinymce', // mark as Design Document 2
        };

        let result;
        if (editingId) {
          result = await dispatch(
            updateDocument({
              id: editingId,
              data: documentData,
            })
          ).unwrap();
          toast.success('Document updated successfully');
        } else {
          result = await dispatch(createDocument(documentData)).unwrap();
          toast.success('Document created successfully');
          if (result?._id || result?.id) {
            setEditingId(result._id || result.id);
          }
        }

        if (redirectToList) {
          router.push('/design-documents-2');
        }

        return result._id || result.id;
      } catch (error) {
        console.error('Failed to save Design Document 2', error);
        const message = (error?.message || '').toLowerCase();
        const isDuplicate =
          message.includes('duplicate') ||
          message.includes('already exists') ||
          message.includes('unique');

        if (!editingId && isDuplicate && retryCount < MAX_RETRIES) {
          const newId = generateDocId();
          setDocumentId(newId);
          toast.warning(`Document ID already exists. Trying with new ID: ${newId}`);
          retryCount += 1;
          continue;
        }

        toast.error(error?.message || 'Failed to save document');
        return null;
      } finally {
        setLoading(false);
      }
    }

    toast.error('Failed to generate unique Document ID. Please try again.');
    return null;
  };

  const buildPdfElement = (contentToUse, { width = 850, padding = 40 } = {}) => {
      let elementToCapture = null;
    let iframeStyleTag = null;
      
      if (editorRef?.current) {
        try {
          const editor = editorRef.current;
          const iframe = editor.getContentAreaContainer().querySelector('iframe');
          
          if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
            const iframeBody = iframe.contentDocument.body;
            const clonedBody = iframeBody.cloneNode(true);
            
            const wrapper = window.document.createElement('div');
            wrapper.id = 'pdf-export-container';
            wrapper.style.position = 'absolute';
            wrapper.style.left = '0';
            wrapper.style.top = '0';
          wrapper.style.width = `${width}px`;
          wrapper.style.maxWidth = `${width}px`;
            wrapper.style.margin = '40px auto';
          wrapper.style.padding = `${padding}px`;
            wrapper.style.backgroundColor = '#ffffff';
            wrapper.style.fontFamily = 'Calibri, Arial, sans-serif';
            wrapper.style.fontSize = '14px';
            wrapper.style.color = '#333';
            wrapper.style.lineHeight = '2';
            wrapper.style.boxSizing = 'border-box';
            wrapper.style.overflow = 'visible';
            wrapper.style.direction = 'ltr';
            wrapper.style.boxShadow = '0 0 0 1px #e5e7eb';
            wrapper.style.pointerEvents = 'none';
            wrapper.style.zIndex = '-9999';
            
            wrapper.appendChild(clonedBody);
            
          iframeStyleTag = window.document.createElement('style');
            iframeStyleTag.id = 'pdf-export-iframe-styles';
            iframeStyleTag.textContent = `
              #pdf-export-container ul, 
              #pdf-export-container ol {
                list-style-position: outside !important;
                padding-left: 25px !important;
                margin-top: 10px !important;
              }
              #pdf-export-container ul {
                list-style-type: circle !important;
              }
              #pdf-export-container ol {
                list-style-type: decimal !important;
              }
              #pdf-export-container li {
                margin-top: 0 !important;
                padding-left: 0 !important;
                display: list-item !important;
                list-style-position: outside !important;
                line-height: 1.4 !important;
                vertical-align: baseline !important;
              }
            `;
            window.document.head.appendChild(iframeStyleTag);
            
            window.document.body.appendChild(wrapper);
            elementToCapture = wrapper;
          }
        } catch (e) {
          console.warn('Could not access TinyMCE iframe, using fallback', e);
        }
      }
      
      if (!elementToCapture) {
        const tempDiv = window.document.createElement('div');
        tempDiv.id = 'pdf-export-container';
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-10000px';
        tempDiv.style.top = '0';
      tempDiv.style.width = `${width}px`;
      tempDiv.style.maxWidth = `${width}px`;
        tempDiv.style.margin = '40px auto';
      tempDiv.style.padding = `${padding}px`;
        tempDiv.style.backgroundColor = '#ffffff';
        tempDiv.style.fontFamily = 'Calibri, Arial, sans-serif';
        tempDiv.style.fontSize = '14px';
        tempDiv.style.color = '#333';
        tempDiv.style.lineHeight = '1.6';
        tempDiv.style.boxSizing = 'border-box';
        tempDiv.style.overflow = 'visible';
        tempDiv.style.direction = 'ltr';
        tempDiv.style.boxShadow = '0 0 0 1px #e5e7eb';
        
        const styleTag = window.document.createElement('style');
        styleTag.id = 'pdf-export-styles';
        styleTag.textContent = `
          #pdf-export-container {
            direction: ltr !important;
            unicode-bidi: normal !important;
          }
          #pdf-export-container p {
            direction: ltr !important;
            unicode-bidi: normal !important;
            margin: 0 0 8px 0;
          }
          #pdf-export-container p[style*="text-align:center"] {
            text-align: center !important;
          }
          #pdf-export-container p[style*="text-align:right"] {
            text-align: right !important;
          }
          #pdf-export-container p[style*="text-align:justify"] {
            text-align: justify !important;
          }
          #pdf-export-container table {
            border-collapse: collapse;
            width: 100%;
          }
          #pdf-export-container table, 
          #pdf-export-container th, 
          #pdf-export-container td {
            border: 1px solid #d1d5db;
          }
          #pdf-export-container th, 
          #pdf-export-container td {
            padding: 6px 8px;
          }
          #pdf-export-container ul, 
          #pdf-export-container ol {
            margin: 0;
            margin-top: 10px !important;
            padding-left: 25px !important;
            list-style-position: outside !important;
            list-style-type: circle !important;
          }
          #pdf-export-container ul {
            list-style-type: circle !important;
          }
          #pdf-export-container ol {
            list-style-type: decimal !important;
          }
          #pdf-export-container li {
            margin: 4px 0;
            margin-top: 0 !important;
            padding-left: 0 !important;
            display: list-item !important;
            list-style-position: outside !important;
            line-height: 1.4 !important;
            vertical-align: baseline !important;
          }
          #pdf-export-container .page-break {
            page-break-after: always !important;
            border-top: 2px dashed #d1d5db;
            margin: 30px 0;
            padding: 15px 0;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }
        `;
        window.document.head.appendChild(styleTag);
        
        tempDiv.innerHTML = contentToUse;
        window.document.body.appendChild(tempDiv);
        
        elementToCapture = tempDiv;
    }

    return { elementToCapture, iframeStyleTag };
  };

  const cleanupPdfElements = () => {
    const container = window.document.getElementById('pdf-export-container');
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    const style = window.document.getElementById('pdf-export-styles');
    if (style) {
      style.parentNode.removeChild(style);
    }
    const iframeStyle = window.document.getElementById('pdf-export-iframe-styles');
    if (iframeStyle) {
      iframeStyle.parentNode.removeChild(iframeStyle);
    }
  };

  const generatePdfBlob = async (contentToUse, fileNameId = documentId) => {
    const { elementToCapture } = buildPdfElement(contentToUse);
    if (!elementToCapture) {
      throw new Error('Failed to prepare content for PDF.');
    }

      const height = elementToCapture.offsetHeight;
      const width = elementToCapture.offsetWidth;
      
      if (!elementToCapture.innerHTML || elementToCapture.innerHTML.trim() === '') {
        throw new Error('Content is empty after rendering');
      }
      if (height === 0 || width === 0) {
        throw new Error('Element has zero dimensions - cannot generate PDF');
      }

      const opt = {
        margin: [0, 0, 0, 0],
      filename: fileNameId ? `Doc_ID_${fileNameId}.pdf` : `${title || 'Document'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          removeContainer: false,
          width: width,
          height: height,
          windowWidth: width,
          windowHeight: height,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          before: '.page-break',
          after: '.page-break',
          avoid: ['img', '.no-break'],
        },
      };

    const blob = await html2pdf().from(elementToCapture).set(opt).outputPdf('blob');
    cleanupPdfElements();
    return blob;
  };

  const downloadBlobWithPrompt = async (blob, fileName) => {
    // Use modern file picker when available (lets user pick folder)
    if (window.showSaveFilePicker) {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'PDF file',
            accept: { 'application/pdf': ['.pdf'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    }

    // Fallback: traditional browser download (uses default downloads folder)
    const link = window.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownload = async () => {
    // Get latest content from editor if available
    let contentToUse = htmlContent;
    if (editorRef?.current) {
      try {
        const editorContent = editorRef.current.getContent();
        if (editorContent && editorContent.trim()) {
          contentToUse = editorContent;
        }
      } catch (e) {
        console.warn('Could not get content from editor, using htmlContent', e);
      }
    }

    if (!contentToUse || !contentToUse.trim()) {
      toast.error('Nothing to download. Please add content first.');
      return;
    }

    try {
      const fileName = documentId ? `Doc_ID_${documentId}.pdf` : `${title || 'Document'}.pdf`;

      // Ensure document is saved so it appears in list and has an ID
      const id = await saveDocument({ redirectToList: false });
      if (!id) return;

      const blob = await generatePdfBlob(contentToUse, documentId);

      // Download first (user-facing speed)
      await downloadBlobWithPrompt(blob, fileName);

      // Upload in background using the same blob (no extra render)
      uploadPdfForDocument(id, contentToUse, documentId, blob).catch((error) => {
        console.error('Failed to upload PDF after download', error);
        toast.error('PDF downloaded but upload failed');
      });

      toast.success('PDF generated and downloaded');
    } catch (err) {
      console.error('Failed to generate/upload PDF', err);
      toast.error('Failed to generate or download PDF');
    }
  };

  const uploadPdfForDocument = async (docId, contentToUse, docIdForFile = documentId, existingBlob = null) => {
    const blob = existingBlob || (await generatePdfBlob(contentToUse, docIdForFile));
    const pdfFileName = docIdForFile ? `Doc_ID_${docIdForFile}.pdf` : `${title || 'Document'}.pdf`;
    const formData = new FormData();
    const pdfFile = new File([blob], pdfFileName, { type: 'application/pdf' });
    formData.append('pdf_file', pdfFile);
    await dispatch(
      uploadPdfToCloudinary({
        id: docId,
        file: formData,
      })
    ).unwrap();
  };

  const handleSaveWithPdf = async () => {
    // Get latest content
    let contentToUse = htmlContent;
    if (editorRef?.current) {
      try {
        const editorContent = editorRef.current.getContent();
        if (editorContent && editorContent.trim()) {
          contentToUse = editorContent;
        }
      } catch (e) {
        console.warn('Could not get content from editor, using htmlContent', e);
      }
    }

    if (!contentToUse || !contentToUse.trim()) {
      toast.error('Nothing to save. Please add content first.');
      return;
    }

    const id = await saveDocument({ redirectToList: false });
    if (!id) return;

    try {
      await uploadPdfForDocument(id, contentToUse);
      toast.success('Document and PDF saved to server');
      router.push('/design-documents-2');
    } catch (error) {
      console.error('Failed to save PDF to server', error);
      toast.error('Document saved but PDF upload failed');
    }
  };

  const handleBack = () => {
    router.push('/design-documents-2');
  };

  return {
    documentId,
    title,
    setTitle,
    htmlContent,
    setHtmlContent,
    recipientEmail,
    setRecipientEmail,
    loading,
    handleSave: handleSaveWithPdf,
    handleDownload,
    handleBack,
  };
}

