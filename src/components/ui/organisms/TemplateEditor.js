"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Quill from "quill"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

// Register font families and pixel sizes BEFORE the editor mounts
try {
  const Font = Quill.import('attributors/class/font')
  Font.whitelist = [
    'arial','times-new-roman','calibri','cambria','garamond','georgia','helvetica','courier-new','verdana',
    'noto-sans','noto-serif','noto-sans-arabic','noto-sans-devanagari','noto-sans-cjk-jp'
  ]
  Quill.register(Font, true)

  const Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px','11px','12px','14px','16px','18px','20px','22px','24px','28px','32px','36px','48px']
  Quill.register(Size, true)
} catch {}

// Register a custom dropdown format for bullet styles
const Parchment = Quill.import('parchment')
class BulletStyleAttributor extends Parchment.Attributor.Attribute {}
const bulletStyle = new BulletStyleAttributor('bulletStyle', 'data-bullet-style', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['filled','circle','square','check']
})
try { Quill.register(bulletStyle, true) } catch {}


const TemplateEditor = ({   name,
  label,
  placeholder = "",
  value = "",
  onChange,
  error,
  defaultValue = "",
  className = "",
  description, 
  setDescription,
  editorValue,
  setEditorValue,
  onInsertAtCursor,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setEditorValue(value || defaultValue || "");
  }, [value, defaultValue]);

  // (registration moved to module scope to ensure toolbar shows correct options)

  // Expose insertAtCursor method to parent
  useEffect(() => {
    if (!onInsertAtCursor || !quillRef.current) return;
      const insertAtCursor = (content) => {
        const editor = quillRef.current.getEditor();
      if (!editor) return;
      const range = editor.getSelection(true);
      const index = range && typeof range.index === 'number' ? range.index : Math.max(0, editor.getLength() - 1)
      // insert as HTML to preserve placeholders like {{name}}
      if (editor.clipboard && typeof editor.clipboard.dangerouslyPasteHTML === 'function') {
        editor.clipboard.dangerouslyPasteHTML(index, content)
        } else {
        editor.insertText(index, content)
        }
      editor.setSelection(index + content.length, 0)
      };
      onInsertAtCursor(insertAtCursor);
  }, [onInsertAtCursor])

  // Custom toolbar handlers (e.g., table insert)
  const tableHtml = (rows = 2, cols = 2) => {
    let html = '<table style="width:100%; border-collapse:collapse;">'
    for (let r = 0; r < rows; r++) {
      html += '<tr>'
      for (let c = 0; c < cols; c++) {
        html += '<td style="border:1px solid #ccc; padding:6px;">&nbsp;</td>'
      }
      html += '</tr>'
    }
    html += '</table><p><br/></p>'
    return html
  }

  // Memoize modules and formats so ReactQuill doesn't re-init on every keystroke
  const modules = useMemo(() => ({
      toolbar: {
        container: [
        [{ font: [
          'arial','times-new-roman','calibri','cambria','garamond','georgia','helvetica','courier-new','verdana',
          'noto-sans','noto-serif','noto-sans-arabic','noto-sans-devanagari','noto-sans-cjk-jp'
        ] }],
        [{ size: ['10px','11px','12px','14px','16px','18px','20px','22px','24px','28px','32px','36px','48px'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold','italic','underline','strike'],
          [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
        [{ direction: 'rtl' }],
        ['blockquote','code-block'],
        // Custom bullet style dropdown
        [{ bulletStyle: ['filled','circle','square','check'] }],
        ['link','image','video'],
        [{ table: 'insert' }],
        ['clean']
      ],
      handlers: {
        table: function () {
          const editor = this?.quill;
          if (!editor) return;
          const range = editor.getSelection(true);
          const html = tableHtml(2, 2);
          editor.clipboard.dangerouslyPasteHTML(range ? range.index : editor.getLength() - 1, html);
        },
        bulletStyle: function (value) {
          const root = this?.quill?.root;
          if (!root) return;
          root.classList.remove('bullet-filled','bullet-circle','bullet-square','bullet-check');
          if (value === 'filled') root.classList.add('bullet-filled');
          if (value === 'circle') root.classList.add('bullet-circle');
          if (value === 'square') root.classList.add('bullet-square');
          if (value === 'check') root.classList.add('bullet-check');
        }
      }
    }
  }), [])

  const formats = useMemo(() => [
    'header','font','size','bold','italic','underline','strike','color','background','script','blockquote','code-block','list','bullet','indent','align','direction','link','image','video'
  ], [])

  if (!mounted) {
    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
          >
            {label}
          </label>
        )}
        <div className="border border-gray-300 dark:border-slate-600 rounded-lg">
          <div className="h-10 bg-gray-100 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-600 rounded-t-lg flex items-center px-3">
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-32 bg-white dark:bg-slate-800 rounded-b-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm dark:text-slate-200">Loading editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      
      <div className="rich-text-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={editorValue}
          onChange={(content) => { setEditorValue(content); if (onChange) onChange(content); }}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          className="dark-mode-editor"
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 dark:text-slate-200">{error.message}</p>
      )}

        <style jsx global>{`
        .rich-text-editor .ql-editor { min-height: calc(100vh - 200px); padding: 24px; }
        /* Map font classes to actual stacks */
        .ql-font-arial { font-family: Arial, Helvetica, sans-serif; }
        .ql-font-times-new-roman { font-family: 'Times New Roman', Times, serif; }
        .ql-font-calibri { font-family: Calibri, 'Segoe UI', Arial, sans-serif; }
        .ql-font-cambria { font-family: Cambria, Georgia, 'Times New Roman', serif; }
        .ql-font-garamond { font-family: Garamond, 'Times New Roman', serif; }
        .ql-font-georgia { font-family: Georgia, 'Times New Roman', serif; }
        .ql-font-helvetica { font-family: Helvetica, Arial, sans-serif; }
        .ql-font-courier-new { font-family: 'Courier New', Courier, monospace; }
        .ql-font-verdana { font-family: Verdana, Geneva, Tahoma, sans-serif; }
        .ql-font-noto-sans { font-family: 'Noto Sans', Arial, sans-serif; }
        .ql-font-noto-serif { font-family: 'Noto Serif', 'Times New Roman', serif; }
        .ql-font-noto-sans-arabic { font-family: 'Noto Sans Arabic', 'Noto Sans', Arial, sans-serif; }
        .ql-font-noto-sans-devanagari { font-family: 'Noto Sans Devanagari', 'Noto Sans', Arial, sans-serif; }
        .ql-font-noto-sans-cjk-jp { font-family: 'Noto Sans CJK JP', 'Noto Sans', Arial, sans-serif; }

        /* Ensure dropdown shows actual names instead of 'Sans Serif' */
        .ql-picker.ql-font .ql-picker-item[data-value="arial"]::before { content: 'Arial'; font-family: Arial, Helvetica, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="times-new-roman"]::before { content: 'Times New Roman'; font-family: 'Times New Roman', Times, serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="calibri"]::before { content: 'Calibri'; font-family: Calibri, 'Segoe UI', Arial, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="cambria"]::before { content: 'Cambria'; font-family: Cambria, Georgia, 'Times New Roman', serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="garamond"]::before { content: 'Garamond'; font-family: Garamond, 'Times New Roman', serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="georgia"]::before { content: 'Georgia'; font-family: Georgia, 'Times New Roman', serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="helvetica"]::before { content: 'Helvetica'; font-family: Helvetica, Arial, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="courier-new"]::before { content: 'Courier New'; font-family: 'Courier New', Courier, monospace; }
        .ql-picker.ql-font .ql-picker-item[data-value="verdana"]::before { content: 'Verdana'; font-family: Verdana, Geneva, Tahoma, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="noto-sans"]::before { content: 'Noto Sans'; font-family: 'Noto Sans', Arial, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="noto-serif"]::before { content: 'Noto Serif'; font-family: 'Noto Serif', 'Times New Roman', serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="noto-sans-arabic"]::before { content: 'Noto Sans Arabic'; font-family: 'Noto Sans Arabic', 'Noto Sans', Arial, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="noto-sans-devanagari"]::before { content: 'Noto Sans Devanagari'; font-family: 'Noto Sans Devanagari', 'Noto Sans', Arial, sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="noto-sans-cjk-jp"]::before { content: 'Noto Sans CJK JP'; font-family: 'Noto Sans CJK JP', 'Noto Sans', Arial, sans-serif; }

        /* Selected label mapping */
        .ql-picker.ql-font .ql-picker-label[data-value="arial"]::before { content: 'Arial'; }
        .ql-picker.ql-font .ql-picker-label[data-value="times-new-roman"]::before { content: 'Times New Roman'; }
        .ql-picker.ql-font .ql-picker-label[data-value="calibri"]::before { content: 'Calibri'; }
        .ql-picker.ql-font .ql-picker-label[data-value="cambria"]::before { content: 'Cambria'; }
        .ql-picker.ql-font .ql-picker-label[data-value="garamond"]::before { content: 'Garamond'; }
        .ql-picker.ql-font .ql-picker-label[data-value="georgia"]::before { content: 'Georgia'; }
        .ql-picker.ql-font .ql-picker-label[data-value="helvetica"]::before { content: 'Helvetica'; }
        .ql-picker.ql-font .ql-picker-label[data-value="courier-new"]::before { content: 'Courier New'; }
        .ql-picker.ql-font .ql-picker-label[data-value="verdana"]::before { content: 'Verdana'; }
        .ql-picker.ql-font .ql-picker-label[data-value="noto-sans"]::before { content: 'Noto Sans'; }
        .ql-picker.ql-font .ql-picker-label[data-value="noto-serif"]::before { content: 'Noto Serif'; }
        .ql-picker.ql-font .ql-picker-label[data-value="noto-sans-arabic"]::before { content: 'Noto Sans Arabic'; }
        .ql-picker.ql-font .ql-picker-label[data-value="noto-sans-devanagari"]::before { content: 'Noto Sans Devanagari'; }
        .ql-picker.ql-font .ql-picker-label[data-value="noto-sans-cjk-jp"]::before { content: 'Noto Sans CJK JP'; }

        /* Size dropdown labels for px sizes */
        .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before { content: '10px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="11px"]::before { content: '11px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before { content: '12px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before { content: '14px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before { content: '16px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before { content: '18px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before { content: '20px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="22px"]::before { content: '22px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before { content: '24px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before { content: '28px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before { content: '32px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before { content: '36px'; }
        .ql-picker.ql-size .ql-picker-item[data-value="48px"]::before { content: '48px'; }

        .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before { content: '10px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="11px"]::before { content: '11px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before { content: '12px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before { content: '14px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before { content: '16px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before { content: '18px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before { content: '20px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="22px"]::before { content: '22px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before { content: '24px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before { content: '28px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before { content: '32px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before { content: '36px'; }
        .ql-picker.ql-size .ql-picker-label[data-value="48px"]::before { content: '48px'; }
      `}</style>

    </div>
  )

}

export default TemplateEditor;