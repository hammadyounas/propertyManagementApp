"use client";
import Card from "../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import GlobalFilter from "../../../components/ui/atoms/GlobalFilter";
import Button from "../../../components/ui/molecules/Button";
import LoadingUI from "../../../components/ui/atoms/LoadingUI";
import { ToastContainer } from "react-toastify";
import { dateFormat } from "../../../libs/utils/helper";
import {
  columns,
} from "../functional/constant";
import NoDataFound from "../../../components/ui/atoms/NoDataFound";
import PaginationUI from "../../../components/ui/molecules/PaginationUI";

export default function DeletedTemplatesUI({
  deletedTemplates,
  onRestore,
  globalFilter,
  setGlobalFilter,
  loading = false,
  router,
  handleBack,
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
                text="Back to Templates"
                icon="heroicons:arrow-left"
                onClick={handleBack}
                className="btn-secondary max-lg:hidden bg-slate-200 dark:bg-slate-700 w-full whitespace-nowrap font-medium"
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
                  <th
                    scope="col"
                    className="table-th font-bold px-4 py-4 text-center whitespace-nowrap"
                  >
                    Restore
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <LoadingUI />
                      </div>
                    </td>
                  </tr>
                ) : deletedTemplates.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="p-4 text-center">
                      <NoDataFound />
                    </td>
                  </tr>
                ) : (
                  deletedTemplates?.map((template, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold">
                            {template.title}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2 text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold">
                            {template.created_by?.name || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        {dateFormat(template.createdAt || template.date)}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex justify-center">
                          <Icon
                            onClick={() => onRestore(template._id || template.id)}
                            className="cursor-pointer text-[20px] hover:text-green-600 transition-colors"
                            icon={"heroicons:arrow-path"}
                            title="Restore Template"
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
