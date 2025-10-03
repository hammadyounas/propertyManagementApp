"use client";
import { Icon } from "@iconify/react";
import { ToastContainer } from "react-toastify";
import {
  categories,
  columns,
  getCategoryColor,
  truncateContent,
} from "../../functional/constant";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import Button from "../../../../components/ui/molecules/Button";
import TemplateSelectionModal from "../molecules/TemplateSelectionModal";
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
                text="Create Document"
                icon="heroicons:plus"
                onClick={onOpenTemplateModal}
                className="btn-primary bg-primary-default w-full whitespace-nowrap font-medium"
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
                          <span className="text-primary-default font-bold cursor-pointer">
                            {document.title}
                          </span>
                        </div>
                      </td>
                      {/* <td className="table-td sm:p-4 p-2">
                        {document.clientName}
                      </td> */}
                      <td className="table-td sm:p-4 p-2 text-left">
                        <div className="">
                          {truncateContent(document.content)}
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        {dateFormat(document.createdAt || document.date)}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex justify-center">
                          <Icon
                            onClick={() => onEdit(document)}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons:pencil-square"}
                          />
                          <Icon
                            onClick={() => onDownload(document)}
                            className="cursor-pointer text-[20px] mx-4"
                            icon={"material-symbols:download"}
                          />
                          <Icon
                            onClick={() => onDelete(document.id)}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons-outline:trash"}
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
