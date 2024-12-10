import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import { ToastContainer } from "react-toastify";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  openModal,
  push,
  handleDelete,
  loading
}) => {
  return (
    <Card noborder>
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className=" flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center">
            <div
              onClick={openModal}
              className="flex items-center mr-3 p-3 cursor-pointer"
            >
              <Icon
                // onClick={() => {}}
                className="cursor-pointer text-[20px] mr-2"
                icon={"heroicons:funnel"}
              />
              <span>Filters</span>
            </div>
            <span className="w-full">
              <Button
                text="Add Property"
                onClick={() => push("/properties/create")}
                className="btn-primary bg-primary-default w-full"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns.map((column, i) => (
                    <th key={i} scope="col" className=" table-th font-bold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {loading && (
                  <tr>
                    <td colSpan={columns.length} className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <LoadingUI />
                      </div>
                    </td>
                  </tr>
                )}
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className=" even:bg-slate-200 dark:even:bg-slate-700"
                  >
                    <td className="table-td">
                      <img
                        src={row.images[0]}
                        className="w-20 h-16"
                      />
                    </td>
                    <td
                      className="table-td text-primary-default font-bold cursor-pointer"
                      onClick={() => push(`/properties/view/${row?._id}`)}
                    >
                      {row.title}
                    </td>
                    <td className="table-td ">{row.address}</td>
                    <td className="table-td ">{row.price}</td>
                    <td className="table-td ">{row.property_type}</td>
                    <td className="table-td ">{row.size}</td>
                    <td className="table-td ">{row.bedrooms}</td>
                    <td className="table-td ">{row.bathrooms}</td>
                    <td className="table-td ">
                      <span className="block w-full">
                        <span
                          className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
      ${row.property_status === "available" ? "text-green-600 bg-green-200" : ""}
      ${row.property_status === "under contract" ? "text-yellow-600 bg-yellow-200" : ""}
      ${row.property_status === "sold" ? "text-blue-600 bg-blue-200" : ""}
      ${row.property_status === "leased" ? "text-purple-600 bg-purple-200" : ""}
      ${row.property_status === "coming soon" ? "text-orange-600 bg-orange-200" : ""}
      ${row.property_status === "withdrawn" ? "text-red-600 bg-red-200" : ""}
    `}
                        >
                          {row.property_status}
                        </span>
                      </span>
                    </td>
                    <td className="table-td ">
                      <div
                        onClick={() => { }}
                        className="lg:h-8 lg:w-8 h-7 w-7 rounded-full cursor-pointer"
                      >
                        {row.assigned_to ? (
                          <Tooltip
                            placement="top"
                            arrow
                            content={row.assigned_salesperson}
                          >
                            <img
                              src={"/assets/images/users/user-1.jpg"}
                              alt=""
                              className="block w-full h-full object-cover rounded-full"
                            />
                          </Tooltip>
                        ) : (
                          "--"
                        )}
                      </div>
                    </td>
                    <td className="table-td ">
                      <div className="flex">
                        <Icon
                          onClick={() => push(`/properties/view/${row?._id}`)}
                          className="cursor-pointer text-[20px]"
                          icon={"heroicons:eye"}
                        />
                        <Icon
                          onClick={() => push(`/properties/edit/${row?._id}`)}
                          className="cursor-pointer text-[20px] mx-4"
                          icon={"heroicons:pencil-square"}
                        />

                        <Icon
                          onClick={() => handleDelete(row?._id)}
                          className="cursor-pointer text-[20px]"
                          icon={"heroicons-outline:trash"}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TableUI;
