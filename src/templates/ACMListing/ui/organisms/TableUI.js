import Card from "../../../../components/combined/molecules/CardUIContainer";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import { dateFormat } from "../../../../libs/utils/helper";
import DropdownMenu from "../../../../components/ui/organisms/DropdownMenu";
import { columns } from "../../functionality/constants/data";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import { Icon } from "@iconify/react/dist/iconify.js";

const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  push,
  acms,
  loading,
  handleDelete,
}) => {
  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center justify-end">
            <div className="mr-10 text-sm font-medium text-gray-500">
              <p className="font-semibold">Total ACMs</p>
              <p>
                {acms?.length || 0} ACM{acms?.length !== 1 ? 's' : ''}
              </p>
            </div>
            <span className="flex gap-2">
              {/* <Button
                text="Preview PDF"
                onClick={() => push("/acm-preview")}
                className="btn-secondary bg-green-600 hover:bg-green-700 w-full font-normal text-sm"
              /> */}
              <Button
                text="Add ACM"
                onClick={() => push("/acms/create")}
                className="btn-primary bg-primary-default w-full font-normal text-sm"
              />
            </span>
          </div>
        </div>
      </div>

      {acms?.length === 0 ? (
        <div className="text-center p-4">No ACM's found.</div>
      ) : (
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="">
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
                  ) : acms?.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="p-4 text-center">
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                    acms?.map((row, i) => (
                      <tr
                        key={i}
                        className="even:bg-slate-200 dark:even:bg-slate-700"
                      >
                        <td className="table-td">
                          <div className="flex justify-center">
                            <img
                              src={row.base_property?.images?.[0] || "/assets/images/users/user-1.jpg"}
                              alt=""
                              className="block w-8 h-8 object-cover rounded-full mr-2"
                            />
                          </div>
                        </td>
                        <td className="table-td">{row.base_property?.title}</td>
                        <td className="table-td">
                          <div className="mt-5">
                            {row.compare_property && row?.compare_property?.length > 0 ? (
                              <div className="inline-flex -gap-4">
                                {row?.compare_property?.slice(0, 4).map((property, index) => (
                                  <Tooltip
                                    key={index}
                                    placement="top"
                                    arrow
                                    content={property?.title}
                                  >
                                    <img
                                      src={
                                        property?.images[0] || "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                                      }
                                      alt={property?.title || "Property"}
                                      className={`w-8 h-8 object-cover rounded-full ${index !== 0 ? "-ml-1" : ""
                                        }`}
                                    />
                                  </Tooltip>
                                ))}
                                {row.compare_property.length > 4 && (
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium -ml-1">
                                    +{row.compare_property.length - 4}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-400">No compare properties</div>
                            )}
                          </div></td>
                        <td className="table-td lowercase">{row.base_property?.no_of_units}</td>
                        <td className="table-td">
                          {row.base_property?.price}
                        </td>
                        <td className="table-td">
                          {row.created_by?.name}
                        </td>
                        <td className="table-td">
                          <div className=" flex justify-center items-center">
                            <Icon
                              onClick={() => push(`/acms/edit/${row._id}`)}
                              className="cursor-pointer text-[20px] mx-4"
                              icon={"heroicons:pencil-square"}
                            />
                            <Icon
                              onClick={() => {
                                handleDelete(row._id);
                              }}
                              className="cursor-pointer text-[20px]"
                              icon={"heroicons-outline:trash"}
                            />
                          </div>
                          {/* <DropdownMenu
                            onEdit={() => push(`/acms/edit/${row._id}`)}
                            onDelete={() => handleDelete(row._id)}
                            showEdit={true}
                            showDelete={true}
                          /> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        // <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10 sm:gap-4 sm:px-4">
        //   {acms.map((row, i) => (
        //     <div
        //       key={row._id || i}
        //       className="bg-gray-100 rounded-lg shadow-sm text-sm max-sm:mb-2 p-2"
        //     >
        //       <div className="flex flex-col gap-2">
        //       {/* card header */}
        //         <div className="flex items-center justify-between capitalize">
        //           <div className={`flex items-center gap-4 ${!row?.base_property?.images?.[0] ? "hidden" : ""}`}>
        //             <img
        //               src={row?.base_property?.images?.[0] || "/assets/images/users/default.jpg"}
        //               alt={row?.base_property?.title || "Default Image"}
        //               className="w-12 h-12 object-cover rounded-lg"
        //             />
        //             <h1 className="lg:text-base text-sm font-medium">
        //               {row.base_property?.title || "Base Property"}
        //             </h1>
        //           </div>

        //           <div>
        //             <DropdownMenu
        //               //   onEdit={() => push(`/acms/edit/${row._id}`)}
        //               //   onDelete={() => handleDelete(row._id)}
        //               onEdit={() => push(``)}
        //               onDelete={() => {}}
        //               showEdit={true}
        //               showDelete={true}
        //             />
        //           </div>
        //         </div>

        //         {/* details */}
        //         <div className="mt-10 w-full mx-auto">
        //           <div className="flex items-center justify-between gap-4">
        //             <div>
        //               <p className="text-gray-500">Created</p>
        //               <p>{dateFormat(row.createdAt)}</p>
        //             </div>
        //             <div>
        //               <p className="text-gray-500">Compare Properties</p>
        //               <p>{row.compare_property?.length || 0}</p>
        //             </div>
        //           </div>
        //           <div className="flex items-center justify-between gap-4 mt-3">
        //             <div>
        //               <p className="text-gray-500">Created By</p>
        //               <p>{row.created_by?.name || "System"}</p>
        //             </div>
        //             <div>
        //               <p className="text-gray-500">Status</p>
        //               <p className={`px-2 py-1 rounded text-xs ${row.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
        //                 {row.isDeleted ? 'Deleted' : 'Active'}
        //               </p>
        //             </div>
        //           </div>
        //         </div>

        //         {/* properties */}
        //         <div className="mt-5">
        //           <p className="text-gray-500 mb-2">Compare Properties</p>
        //           {row.compare_property && row?.compare_property?.length > 0 ? (
        //             <div className="inline-flex -gap-4">
        //               {row?.compare_property?.slice(0, 4).map((property, index) => (
        //                 <Tooltip
        //                   key={index}
        //                   placement="top"
        //                   arrow
        //                   content={property?.title}
        //                 >
        //                   <img
        //                     src={
        //                       property?.images?.[0] ||
        //                       "/assets/images/users/user-1.jpg"
        //                     }
        //                     alt={property?.title || "Property"}
        //                     className={`w-8 h-8 object-cover rounded-full ${
        //                       index !== 0 ? "-ml-1" : ""
        //                     }`}
        //                   />
        //                 </Tooltip>
        //               ))}
        //               {row.compare_property.length > 4 && (
        //                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium -ml-1">
        //                   +{row.compare_property.length - 4}
        //                 </div>
        //               )}
        //             </div>
        //           ) : (
        //             <div className="text-gray-400">No compare properties</div>
        //           )}
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      )}
    </Card>
  );
};

export default TableUI;

