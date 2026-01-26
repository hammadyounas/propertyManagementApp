"use client";
import { Icon } from "@iconify/react";
import { ToastContainer } from "react-toastify";
import {
  columns,
} from "../../functional/constant";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import Button from "../../../../components/ui/molecules/Button";
import TemplateSelectionModal from "../molecules/TemplateSelectionModal";
import UploadPdfModal from "../molecules/UploadPdfModal";
import EmailModal from "../molecules/EmailModal";
import { dateFormat } from "../../../../libs/utils/helper";
import NoDataFound from "../../../../components/ui/atoms/NoDataFound";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";

export default function DocumentListingUI({
  documents,
  onEdit,
  onDelete,
  onDuplicate,
  globalFilter,
  setGlobalFilter,
  loading = false,
  setCategoryFilter,
  categoryFilter,
  router,
  onDownload,
  templates = [],
  selectedTemplateId = "",
  setSelectedTemplateId = () => {},
  showTemplateModal = false,
  onOpenTemplateModal = () => {},
  onCloseTemplateModal = () => {},
  onCreateWithTemplate = () => {},
  // Pagination props
  currentPage = 0,
  pageSize = 10,
  totalCount = 0,
  totalPages = 0,
  handlePageChange = () => {},
  // Upload PDF props
  showUploadModal = false,
  onOpenUploadModal = () => {},
  onCloseUploadModal = () => {},
  onUploadPdf = () => {},
  uploadLoading = false,
  uploadingDocument = null,
  // Email props
  showEmailModal = false,
  onOpenEmailModal = () => {},
  onCloseEmailModal = () => {},
  onSendEmail = () => {},
  emailLoading = false,
  emailingDocument = null,
}) {
  return (
    <Card noborder>
      <ToastContainer />
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end gap-2 max-sm:mt-2">
          <div className="w-full flex items-center max-sm:justify-end gap-2 whitespace-nowrap text-sm">
            <span className="">
              <Button
                text="Restore Documents"
                icon="heroicons:trash"
                onClick={() => router.push("/documents/deleted")}
                className="btn-secondary max-lg:hidden bg-black-500 dark:bg-slate-700 w-full whitespace-nowrap font-medium"
              />
            </span>
            <span className="">
              <Button
                text="Create Document"
                icon="heroicons:plus"
                onClick={onOpenTemplateModal}
                className="btn-primary max-lg:hidden bg-primary-default w-full whitespace-nowrap font-medium"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 text-center">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="table-th font-bold px-4 py-4 text-center whitespace-nowrap"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <LoadingUI />
                      </div>
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center">
                      <NoDataFound />
                    </td>
                  </tr>
                ) : (
                  documents?.map((document, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex items-center justify-center">
                          <span className="font-mono font-semibold text-primary-default">
                            {document.doc_id || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold cursor-pointer">
                            {document.title}
                          </span>
                        </div>
                      </td>
                      <td className={`table-td sm:p-4 p-2 ${document.email_recipient ? 'lowercase' : ''}`}>
                        {document.email_recipient || 'N/A'}
                      </td>
                      <td className="table-td sm:p-4 p-2 text-center">
                        <div className="flex items-center justify-center">
                          {/* <img src={document.created_by?.avatar || "/assets/images/users/default.jpg"} alt={document.created_by?.name} className="w-8 h-8 rounded-full mr-2" /> */}
                          <span className="text-primary-default font-bold cursor-pointer">
                            {document?.created_by?.name}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        {dateFormat(document.createdAt || document.date)}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex justify-center">
                          <Icon
                            onClick={() => onOpenEmailModal(document._id || document.id)}
                            className={`text-[20px] transition-colors ${
                              document.pdf_file && document.pdf_file.trim() !== ''
                                ? 'cursor-pointer hover:text-green-600'
                                : 'cursor-not-allowed text-gray-400 dark:text-slate-600'
                            }`}
                            icon={"hugeicons:mail-send-02"}
                            title={
                              document.pdf_file && document.pdf_file.trim() !== ''
                                ? 'Send Email'
                                : 'Upload PDF first to send email'
                            }
                          />
                          <Icon
                            onClick={() => onOpenUploadModal(document._id || document.id)}
                            className="cursor-pointer text-[20px] ml-4 hover:text-primary-default transition-colors"
                            icon={"bytesize:upload"}
                            title="Upload PDF"
                          />
                          
                          <a 
                            href={document.pdf_file || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!document.pdf_file || document.pdf_file.trim() === '') {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Icon
                              className={`${
                                document.pdf_file && document.pdf_file.trim() !== '' 
                                  ? 'cursor-pointer hover:text-blue-600' 
                                  : 'cursor-not-allowed text-gray-400 dark:text-slate-600'
                              } text-[20px] mx-4 transition-colors`}
                              icon={"material-symbols:download"}
                              title={
                                document.pdf_file && document.pdf_file.trim() !== ''
                                  ? 'Download PDF'
                                  : 'No PDF uploaded'
                              }
                            />
                          </a>
                          <Icon
                            onClick={() => onEdit(document)}
                            className="cursor-pointer text-[20px] hover:text-blue-600 transition-colors mr-4"
                            icon={"heroicons-outline:pencil-square"}
                            title="Edit"
                          />
                          <Icon
                            onClick={() => onDelete(document._id || document.id)}
                            className="cursor-pointer text-[20px] hover:text-red-600 transition-colors"
                            icon={"heroicons-outline:trash"}
                            title="Delete"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={onCloseTemplateModal}
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
        onCreateDocument={onCreateWithTemplate}
        loading={loading}
      />

      <UploadPdfModal
        isOpen={showUploadModal}
        onClose={onCloseUploadModal}
        onUpload={onUploadPdf}
        loading={uploadLoading}
        documentTitle={uploadingDocument?.title || "Upload PDF"}
      />

      <EmailModal
        isOpen={showEmailModal}
        onClose={onCloseEmailModal}
        onSend={onSendEmail}
        loading={emailLoading}
        docTitle={emailingDocument?.title || "Document"}
        clientName={emailingDocument?.clientName || ""}
        hasPdf={emailingDocument?.pdf_file && emailingDocument.pdf_file.trim() !== ''}
      />
      
      {/* Pagination */}
      {totalCount > pageSize && (
        <div className="flex w-full justify-end mt-4 items-center">
          <PaginationUI
            pageCount={totalPages}
            onPageChange={({ selected }) => handlePageChange(selected)}
            currentPage={currentPage}
          />
        </div>
      )}
    </Card>
  );
}
