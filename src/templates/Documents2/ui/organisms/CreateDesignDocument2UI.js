"use client";
import { Editor } from "@tinymce/tinymce-react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CreateDesignDocument2UI({
  documentId = "",
  title = "",
  setTitle = () => {},
  htmlContent = "",
  setHtmlContent = () => {},
  recipientEmail = "",
  setRecipientEmail = () => {},
  loading = false,
  onSave = () => {},
  onDownload = () => {},
  onBack = () => {},
  editorRef,
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
              >
                <Icon
                  icon={"material-symbols:arrow-back-ios-rounded"}
                  className="text-center"
                />
              </button>
              <div className="flex-1 min-w-0 w-full">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Untitled Document"
                  className="w-full text-lg sm:text-xl font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                />
                <div className="flex items-center space-x-4 mt-1 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                  <span className="hidden sm:inline">
                    Created on {new Date().toLocaleDateString("en-US")}
                  </span>
                  {documentId && (
                    <span className="flex items-center gap-2 font-mono font-semibold text-primary-default">
                      <Icon icon="mdi:identifier" className="w-4 h-4" />
                      Doc ID: {documentId}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onDownload}
                disabled={loading}
                className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:download" />
                <span>{loading ? "Downloading..." : "Download PDF"}</span>
              </button>
              <button
                onClick={onSave}
                disabled={loading}
                className="px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:content-save" />
                <span>{loading ? "Saving..." : "Save Document"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layout: editor + side panel */}
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-80px)]">
        {/* Editor */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 p-4" dir="ltr">
          <Editor
            apiKey="zhkvm0rih3ilmu7cht7zl3l1ya9eww4vramquv0cau8k7sq3"
            onInit={(evt, editor) => {
              if (editorRef) {
                editorRef.current = editor;
              }
              if (htmlContent) {
                editor.setContent(htmlContent);
              }
            }}
            value={htmlContent}
            init={{
              height: "calc(100vh - 200px)",
              menubar: true,
              menu: {
                format: {
                  title: "Format",
                  items: "bold italic underline strikethrough superscript subscript code | formats blocks fonts fontsize align lineheight | forecolor backcolor | removeformat"
                }
              },
              // Rich feature set similar to Word
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "textalign", // Required for alignment buttons
              ],
              toolbar:
                "undo redo | fontfamily fontsize | lineheight blocks | " +
                "bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | table link image | pagebreak | removeformat | code fullscreen | help",
              // Custom font sizes: 6px to 25px
              fontsize_formats: "6px 8px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px",
              directionality: "ltr",
              forced_root_block: "p",
              forced_root_block_attrs: {
                dir: "ltr",
                style:
                  "direction:ltr !important; unicode-bidi:normal !important; text-align:left !important;",
              },
              body_class: "ltr-editor",
              body_id: "tinymce-ltr-body",
              content_style:
                // Gray background + centered white \"page\" similar to MS Word
                "html { background:#f3f4f6; direction:ltr !important; } " +
                "body { direction:ltr !important; unicode-bidi:normal !important; text-align:left !important; " +
                "max-width:800px; margin:40px auto; padding:40px; background:#ffffff; " +
                "box-shadow:0 0 0 1px #e5e7eb; font-family:Calibri,Arial,sans-serif; font-size:14px; } " +
                "p { direction:ltr !important; unicode-bidi:normal !important; } " +
                "p[style*=\"text-align:center\"] { text-align:center !important; } " +
                "p[style*=\"text-align:right\"] { text-align:right !important; } " +
                "p[style*=\"text-align:justify\"] { text-align:justify !important; } " +
                "table { border-collapse:collapse; width:100%; } " +
                "table, th, td { border:1px solid #d1d5db; } th, td { padding:6px 8px; } " +
                ".page-break { page-break-after: always; border-top: 2px dashed #d1d5db; margin: 30px 0; padding: 15px 0; text-align: center; color: #9ca3af; font-size: 12px; clear: both; } " +
                ".page-break::before { content: \"--- Page Break ---\"; }",
              // Custom formats for line height
              formats: {
                lineheight_02: { block: "p", styles: { lineHeight: "0.2" }, exact: true },
                lineheight_04: { block: "p", styles: { lineHeight: "0.4" }, exact: true },
                lineheight_06: { block: "p", styles: { lineHeight: "0.6" }, exact: true },
                lineheight_08: { block: "p", styles: { lineHeight: "0.8" }, exact: true },
                lineheight_1: { block: "p", styles: { lineHeight: "1" }, exact: true },
                lineheight_11: { block: "p", styles: { lineHeight: "1.1" }, exact: true },
                lineheight_12: { block: "p", styles: { lineHeight: "1.2" }, exact: true },
                lineheight_13: { block: "p", styles: { lineHeight: "1.3" }, exact: true },
                lineheight_14: { block: "p", styles: { lineHeight: "1.4" }, exact: true },
                lineheight_15: { block: "p", styles: { lineHeight: "1.5" }, exact: true },
                lineheight_2: { block: "p", styles: { lineHeight: "2" }, exact: true },
              },
              setup: (editor) => {
                // Add page break button
                editor.ui.registry.addButton("pagebreak", {
                  text: "Page Break",
                  tooltip: "Insert Page Break",
                  onAction: () => {
                    const pageBreakHtml = '<div class="page-break" style="page-break-after: always; border-top: 2px dashed #d1d5db; margin: 30px 0; padding: 15px 0; text-align: center; color: #9ca3af; font-size: 12px; clear: both;">--- Page Break ---</div>';
                    editor.insertContent(pageBreakHtml);
                  }
                });

                // Add line height to Format menu (nested submenu)
                editor.ui.registry.addNestedMenuItem("lineheight", {
                  text: "Line height",
                  getSubmenuItems: () => [
                    { type: "menuitem", text: "0.2", onAction: () => editor.formatter.apply("lineheight_02") },
                    { type: "menuitem", text: "0.4", onAction: () => editor.formatter.apply("lineheight_04") },
                    { type: "menuitem", text: "0.6", onAction: () => editor.formatter.apply("lineheight_06") },
                    { type: "menuitem", text: "0.8", onAction: () => editor.formatter.apply("lineheight_08") },
                    { type: "menuitem", text: "1", onAction: () => editor.formatter.apply("lineheight_1") },
                    { type: "menuitem", text: "1.1", onAction: () => editor.formatter.apply("lineheight_11") },
                    { type: "menuitem", text: "1.2", onAction: () => editor.formatter.apply("lineheight_12") },
                    { type: "menuitem", text: "1.3", onAction: () => editor.formatter.apply("lineheight_13") },
                    { type: "menuitem", text: "1.4", onAction: () => editor.formatter.apply("lineheight_14") },
                    { type: "menuitem", text: "1.5", onAction: () => editor.formatter.apply("lineheight_15") },
                    { type: "menuitem", text: "2", onAction: () => editor.formatter.apply("lineheight_2") },
                  ]
                });

                // Add line height toolbar button (optional, for quick access)
                editor.ui.registry.addMenuButton("lineheight", {
                  text: "Line Height",
                  fetch: (callback) => {
                    const items = [
                      { type: "menuitem", text: "0.2", onAction: () => editor.formatter.apply("lineheight_02") },
                      { type: "menuitem", text: "0.4", onAction: () => editor.formatter.apply("lineheight_04") },
                      { type: "menuitem", text: "0.6", onAction: () => editor.formatter.apply("lineheight_06") },
                      { type: "menuitem", text: "0.8", onAction: () => editor.formatter.apply("lineheight_08") },
                      { type: "menuitem", text: "1.0", onAction: () => editor.formatter.apply("lineheight_1") },
                      { type: "menuitem", text: "1.1", onAction: () => editor.formatter.apply("lineheight_11") },
                      { type: "menuitem", text: "1.2", onAction: () => editor.formatter.apply("lineheight_12") },
                      { type: "menuitem", text: "1.3", onAction: () => editor.formatter.apply("lineheight_13") },
                      { type: "menuitem", text: "1.4", onAction: () => editor.formatter.apply("lineheight_14") },
                      { type: "menuitem", text: "1.5", onAction: () => editor.formatter.apply("lineheight_15") },
                      { type: "menuitem", text: "2.0", onAction: () => editor.formatter.apply("lineheight_2") },
                    ];
                    callback(items);
                  }
                });
              },
              branding: false,
              promotion: false,
            }}
            onEditorChange={(content) => {
              setHtmlContent(content);
            }}
          />
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-80 p-4 bg-white dark:bg-slate-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-slate-700 max-h-96 lg:max-h-none overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 my-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


