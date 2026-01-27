import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import { ToastContainer } from "react-toastify";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import DropdownUINew from "../../../../components/ui/organisms/DropdownUINew";
import NoDataFound from "../../../../components/ui/atoms/NoDataFound";

const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  openModal,
  push,
  openDeleteModal,
  loading,
  properties,
  setStatusFilter,
  statusFilter,
}) => {
  return (
    <Card noborder>
      <ToastContainer />
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end gap-2 max-sm:mt-2">
          <div className="w-full flex items-center max-sm:justify-end gap-2 whitespace-nowrap text-sm">
            <DropdownUINew
              label={statusFilter || "Property Status"}
              wrapperClass="sm:w-48"
              labelClass="btn-secondary bg-primary-default flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer"
              classMenuItems="left-0 max-sm:w-32 text-sm"
              classItem="p-2"
              onSelect={(value) => {
                setStatusFilter(value);
              }}
              items={[
                { label: "All", value: "" },
                { label: "Available", value: "available" },
                { label: "Under Contract", value: "under contract" },
                { label: "Leased", value: "leased" },
                { label: "Coming soon", value: "coming soon" },
                { label: "Withdraw", value: "withdrawn" },
                { label: "Sold", value: "sold" },
                { label: "Expired", value: "expired" },
              ]}
            />
            <span className="">
              <Button
                text="Add Property"
                icon="heroicons:plus"
                onClick={() => push("/properties/create")}
                className="btn-primary text-sm bg-primary-default w-full whitespace-nowrap font-medium"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700  text-center">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th key={i} scope="col" className="table-th font-bold  px-4 py-4 text-center whitespace-nowrap">
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
                ) : properties.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center">
                     <NoDataFound />
                    </td>
                  </tr>
                ) : (
                  rows?.map((row, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td sm:p-4 p-2">{row.address + ' ' + row.street_number + ' ' + row.city}</td>
                      <td className="table-td sm:p-4 p-2">{row.property_type}</td>
                      <td className="table-td sm:p-4 p-2">{row.no_of_units}</td>
                      <td className="table-td sm:p-4 p-2">
                        {row.owner_name}, {row.owner_address}
                        {/* {row.owneraddress} */}
                      </td>
                      <td className="table-td sm:p-4 p-2 whitespace-nowrap">
                        {row.phone_number}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <span className="block w-full whitespace-nowrap">
                          <span
                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
                          ${
                            row.property_status === "available"
                              ? "text-green-600 bg-green-200"
                              : ""
                          }
                          ${
                            row.property_status  === "under contract"
                              ? "text-yellow-600 bg-yellow-200"
                              : ""
                          }
                          ${
                            row.property_status === "sold"
                              ? "text-blue-600 bg-blue-200"
                              : ""
                          }
                          ${
                            row.property_status === "leased"
                              ? "text-purple-600 bg-purple-200"
                              : ""
                          }
                          ${
                            row.property_status === "coming soon"
                              ? "text-orange-600 bg-orange-200"
                              : ""
                          }
                          ${
                            row.property_status === "withdrawn"
                              ? "text-red-600 bg-red-200"
                              : ""
                          }
                        `}
                          >
                            {row.property_status}
                          </span>
                        </span>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        {row.assigned_to && row?.assigned_to?.length > 0 ? (
                          <div className="inline-flex gap-2">
                            {row?.assigned_to?.map((salesperson, index) => (
                              <Tooltip
                                key={index}
                                placement="top"
                                arrow
                                content={salesperson?.name}
                              >
                                <img
                                  src={
                                    salesperson?.avatar ||
                                    "/assets/images/users/user-1.jpg"
                                  } // Replace with actual avatar URL if available
                                  alt={salesperson.name}
                                  className="block w-8 h-8 object-cover rounded-full mx-auto"
                                />
                              </Tooltip>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-400">--</div>
                        )}
                        {/* {row.assigned_salesperson} */}
                      </td>
                      <td className="table-td sm:p-4 p-2">
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
