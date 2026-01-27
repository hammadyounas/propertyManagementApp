import Card from "../../../../components/combined/molecules/CardUIContainer";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import { dateFormat } from "../../../../libs/utils/helper";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import { Icon } from "@iconify/react/dist/iconify.js";
import NoDataFound from "../../../../components/ui/atoms/NoDataFound";

const TableUI = ({
  columns,
  globalFilter,
  setGlobalFilter,
  push,
  acms,
  loading,
  openDeleteModal,
  handleGeneratePDF,
  downloadingPDF,
  openImageModal,
}) => {
  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center sm:justify-end justify-center">
            <div className="mr-10 text-sm font-medium text-gray-500">
              <p className="font-semibold">Total ACMs</p>
              <p>
                {acms?.length || 0} ACM{acms?.length !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="flex gap-2">
              <Button
                text="Add ACM"
                icon="heroicons:plus"
                onClick={() => push("/acms/create")}
                className="btn-primary text-sm bg-primary-default w-full font-normal text-sm"
              />
            </span>
          </div>
        </div>
      </div>
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
                      className=" table-th font-bold text-center whitespace-nowrap"
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
                      <NoDataFound />
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
                            src={
                              row.base_property?.images?.[0] ||
                              "/assets/images/all-img/no-property-img.png"
                            }
                            alt=""
                            className="block w-8 h-8 object-cover rounded-md mr-2 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openImageModal(
                              row.base_property?.images || [row.base_property?.images?.[0] || "/assets/images/all-img/no-property-img.png"],
                              `${row.base_property?.title} - Base Property`
                            )}
                          />
                        </div>
                      </td>
                      <td className="table-td">{row.base_property?.title}</td>
                      <td className="table-td">
                        <div className="">
                          {row.compare_property &&
                          row?.compare_property?.length > 0 ? (
                            <div className="inline-flex cursor-pointer -gap-4">
                              {row?.compare_property
                                ?.slice(0, 4)
                                .map((property, index) => (
                                  <Tooltip
                                    key={index}
                                    placement="top"
                                    arrow
                                    content={
                                      <>
                                        <p className="text-primary-default">
                                          <strong>Title:</strong>{" "}
                                          {property?.title}
                                        </p>
                                        <p className="text-primary-default">
                                          <strong>Address:</strong>{" "}
                                          {property?.address +
                                            ", " +
                                            property?.street_name +
                                            ", " +
                                            property?.street_number +
                                            ", " +
                                            property?.city}
                                        </p>
                                        <p className="text-primary-default">
                                          <strong>Price:</strong> $
                                          {property?.price}
                                        </p>
                                      </>
                                    }
                                  >
                                    <img
                                      src={
                                        property?.images[0] ||
                                        "/assets/images/all-img/no-property-img.png"
                                      }
                                      alt={property?.title || "Property"}
                                      className={`w-8 h-8 object-cover rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                                        index !== 0 ? "-ml-1" : ""
                                      }`}
                                      onClick={() => openImageModal(
                                        property?.images || [property?.images?.[0] || "/assets/images/all-img/no-property-img.png"],
                                        `${property?.title} - Compare Property`
                                      )}
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
                            <div className="text-gray-400">
                              No compare properties
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="table-td">{row.prepared_for}</td>
                      <td className="table-td lowercase">
                        {row.base_property?.no_of_units}
                      </td>
                      <td className="table-td font-semibold">
                        ${row.base_property?.price}
                      </td>
                      <td className="table-td">{row.created_by?.name}</td>
                      <td className="table-td">{dateFormat(row.createdAt)}</td>
                      <td className="table-td">
                        <div className="flex justify-center items-center">
                          <Icon
                            onClick={() => handleGeneratePDF(row._id)}
                            className={`cursor-pointer text-green-700 text-xl mx-2 ${
                              downloadingPDF ? "opacity-50" : ""
                            }`}
                            icon={
                              downloadingPDF
                                ? "eos-icons:loading"
                                : "material-symbols:download"
                            }
                            disabled={downloadingPDF}
                          />
                          <Icon
                            onClick={() => {
                              openDeleteModal(row._id);
                            }}
                            className="cursor-pointer text-red-500 text-xl"
                            icon={"heroicons-outline:trash"}
                          />
                        </div>
                        {/* <DropdownMenu
                            onEdit={() => push(`/acms/edit/${row._id}`)}
                            onDelete={() => openDeleteModal(row._id)}
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
    </Card>
  );
};

export default TableUI;

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
