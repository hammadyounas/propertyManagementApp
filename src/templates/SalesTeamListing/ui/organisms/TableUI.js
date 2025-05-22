import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import DropdownUINew from "../../../../components/ui/organisms/DropdownUINew";
import Button from "../../../../components/ui/molecules/Button";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import { ToastContainer } from "react-toastify";
import { dateFormat } from "../../../../libs/utils/helper";
const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  push,
  loading,
  openDeleteModal,
  users,
  setStatusFilter,
  setSelectedFilter,
  selectedFilter,
}) => {
  return (
    <Card noborder>
      <ToastContainer />
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className=" flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center gap-2">
            <DropdownUINew
              label={selectedFilter}
              wrapperClass="w-40"
              labelClass="btn-secondary bg-primary-default font-normal flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer"
              classMenuItems="w-40 left-0"
              classItem="p-2 text-sm"
              onSelect={(value) => {
                setSelectedFilter(value === "active" ? "Active" : "Inactive");
                setStatusFilter(value);
              }}
              items={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
            ;
            <span className="w-full">
              <Button
                text="Add Broker"
                onClick={() => push("/broker/create")}
                className="btn-primary bg-primary-default w-full font-normal"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full text-center divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-center table-th font-bold"
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
                ) : users?.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  rows?.map((row, i) => (
                    <tr
                      key={i}
                      className=" even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td ">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold cursor-pointer">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="table-td ">{row.contact_number}</td>
                      <td className="table-td ">{row.email}</td>
                      <td className="table-td ">{row.licence_number}</td>
                      <td className="table-td ">
                        {dateFormat(row.joining_date)}
                      </td>
                      <td className="table-td ">
                        <span className="block w-full">
                          <span
                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
                          ${
                            row.status === "active"
                              ? "text-green-600 bg-green-200"
                              : ""
                          }
                          ${
                            row.status === "inactive"
                              ? "text-red-600 bg-red-200"
                              : ""
                          }
                        `}
                          >
                            {row.status}
                          </span>
                        </span>
                      </td>
                      <td className="table-td ">
                        <div className="flex justify-center">
                          <Icon
                            onClick={() => push(`/broker/view/${row._id}`)}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons:eye"}
                          />
                          <Icon
                            onClick={() => push(`/broker/edit/${row._id}`)}
                            className="cursor-pointer text-[20px] mx-4"
                            icon={"heroicons:pencil-square"}
                          />

                          <Icon
                            onClick={() => openDeleteModal(row?._id)}
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
    </Card>
  );
};

export default TableUI;
