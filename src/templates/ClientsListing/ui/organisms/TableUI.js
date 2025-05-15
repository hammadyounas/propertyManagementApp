import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  push,
  openDeleteModal,
  loading,
  users,
}) => {
  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className=" flex flex-wrap items-center justify-end">
            <span className="">
              <Button
                text="Add Client"
                onClick={() => push("/clients/create")}
                className="btn-primary bg-primary-default w-full"
              />
            </span>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 text-center">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className=" table-th font-bold text-center"
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
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td">
                        <div className="flex items-center justify-center">
                          {/* <img
                            src={"/assets/images/users/user-1.jpg"}
                            alt=""
                            className="block w-8 h-8 object-cover rounded-full mr-2"
                          /> */}
                          <span className="text-primary-default font-bold cursor-pointer">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="table-td">{row.phoneNumber}</td>
                      <td className="table-td">{row.email}</td>
                      <td className="table-td">{row.type}</td>
                      <td className="table-td">
                        <span className="block w-full">
                          <span
                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
              ${row.status === "active" ? "text-green-600 bg-green-200" : ""}
              ${row.status === "inactive" ? "text-red-600 bg-red-200" : ""}
              ${row.status === "pending" ? "text-yellow-600 bg-yellow-200" : ""}
              `}
                          >
                            {row.status}
                          </span>
                        </span>
                      </td>
                      <td className="table-td">
                        <div className="flex justify-center items-center">
                          <Icon
                            onClick={() => push(`/clients/view/${row._id}`)}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons:eye"}
                          />
                          <Icon
                            onClick={() => push(`/clients/edit/${row._id}`)}
                            className="cursor-pointer text-[20px] mx-4"
                            icon={"heroicons:pencil-square"}
                          />
                          <Icon
                            onClick={() => {
                              openDeleteModal(row._id);
                            }}
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
