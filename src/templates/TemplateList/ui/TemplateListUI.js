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
  truncateContent,
} from "../functional/constant";
import NoDataFound from "../../../components/ui/atoms/NoDataFound";
import PaginationUI from "../../../components/ui/molecules/PaginationUI";

export default function TemplateListUI({
  templates,
  onEdit,
  onDelete,
  onDuplicate,
  globalFilter,
  setGlobalFilter,
  loading = false,
  setCategoryFilter,
  categoryFilter,
  router,
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
            {/* <DropdownUINew
              label={categoryFilter || "All Categories"}
              wrapperClass="w-full sm:w-40"
              labelClass="btn-secondary bg-primary-default capitalize flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer"
              classMenuItems="left-0 max-sm:w-32 text-sm"
              classItem="p-2"
              onSelect={(value) => {
                setCategoryFilter(value);
              }}
              items={categories}
            /> */}
            <span className="">
              <Button
                text="Add Template"
                icon="heroicons:plus"
                onClick={() => router.push("/templates/create")}
                className="btn-primary bg-primary-default w-full whitespace-nowrap font-medium max-lg:hidden"
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
                ) : templates.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center">
                      <NoDataFound />
                    </td>
                  </tr>
                ) : (
                  templates?.map((template, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold cursor-pointer">
                            {template.title}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2 text-center">
                        <div className="flex items-center justify-center">
                          <img src={template.created_by?.avatar || "/assets/images/users/default.jpg"} alt={template.created_by?.name} className="w-8 h-8 rounded-full mr-2" />
                          <span className="text-primary-default font-bold cursor-pointer">
                            {template.created_by.name}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        {dateFormat(template.createdAt || template.date)}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex justify-center">
                          <Icon
                            onClick={() => onEdit(template._id)}
                            className="cursor-pointer text-[20px] max-lg:hidden"
                            icon={"heroicons:pencil-square"}
                          />
                          <Icon
                            onClick={() => onDuplicate(template)}
                            className="cursor-pointer text-[20px] mx-4"
                            icon={"heroicons:document-duplicate"}
                          />
                          <div className="relative group inline-block">
                            <Icon
                              onClick={() => onDelete(template._id)}
                              className="cursor-pointer text-[20px]"
                              icon="heroicons-outline:trash"
                            />
                            <span
                              className="absolute -top-8 left-1/2 -translate-x-1/2 
                   bg-gray-800 text-white text-xs rounded py-1 px-2 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   pointer-events-none whitespace-nowrap"
                            >
                              Delete
                            </span>
                          </div>
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
