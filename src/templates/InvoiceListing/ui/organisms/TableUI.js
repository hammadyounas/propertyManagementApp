import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import Invoice from "./Invoice";
import DropdownUI from "../../../../components/ui/organisms/DropdownUI";
import { dateFormat, getStatusClasses } from "../../../../libs/utils/helper";
import Dropdown from "../../../../components/ui/organisms/Dropdown";
import DropdownUINew from "../../../../components/ui/organisms/DropdownUINew";

const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  push,
  loading,
  invoices,
  downloadPDF,
  selectedInvoice,
  selectedLanguage,
  handleStatusChange,
  setStatusFilter,
  statusFilter,
}) => {
  return (
    <Card noborder>
      <div className="flex sm:justify-between max-sm:flex-col justify-end items-end sm:items-center mb-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end gap-2 max-sm:mt-2">
          <div className="w-full flex items-center max-sm:justify-end gap-2 whitespace-nowrap text-sm">
            <DropdownUINew
              label={statusFilter || "Invoice Status"}
              wrapperClass="sm:w-48"
              labelClass="btn-secondary bg-primary-default flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer"
              classMenuItems="left-0 max-sm:w-32 text-sm"
              classItem="p-2"
              onSelect={(value) => {
                setStatusFilter(value);
              }}
              items={[
                { label: "All", value: "" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
                { label: "Pending", value: "pending" },
              ]}
            />
            <span className="w-full">
              <Button
                text="Create Invoice"
                onClick={() => push("/invoices/create")}
                className="btn-primary bg-primary-default w-full font-normal"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6 ">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-x-auto overflow-visible min-h-[30vh]">
            <table className="min-w-full text-center divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="table-th font-bold text-center"
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
                ) : invoices?.length === 0 ? (
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
                      <td className="table-td">INV-{row.invoiceNumber}</td>
                      <td className="table-td whitespace-nowrap">
                        {dateFormat(row.invoiceDate)}
                      </td>
                      <td className="table-td">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold text-center whitespace-nowrap">
                            {row.client_name || row?.buyer?.name}
                          </span>
                        </div>
                      </td>
                      <td className="table-td">
                        {row.client_address || row?.buyer?.address}
                      </td>
                      <td className="table-td whitespace-nowrap">
                        {row.responsible_broker || row?.seller?.name || "N/A"}
                      </td>
                      <td className={`table-td`}>
                        {row.notary_date || row?.instrumentalNotary || "N/A"}
                      </td>
                      <td className="table-td">
                        {row.commissions_payable || row?.totalCommissionPayable}
                      </td>
                      {/* <td className="table-td">
                        <span className="block w-full  whitespace-nowrap">
                          <span
                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
                          ${
                            row?.status === "approved" &&
                            "text-green-600 bg-green-200"
                          }
                          ${
                            row?.status === "rejected" &&
                            "text-red-600 bg-red-200"
                          }
                          ${
                            row?.status === "pending" &&
                            "text-yellow-600 bg-yellow-200"
                          }`}
                          >
                            {row?.status}
                          </span>
                        </span>
                      </td> */}
                      <td className="table-td">
                        <Dropdown
                          label={row.status}
                          labelClass={`capitalize inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${getStatusClasses(
                            row.status
                          )}`}
                          iconClass={`${getStatusClasses(row.status)}`}
                          classMenuItems="w-32 min-w-[120px] top-full mt-1"
                          classItem="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          items={[
                            {
                              label: "Approved",
                              onClick: () =>
                                handleStatusChange(row._id, "approved"),
                            },
                            {
                              label: "Pending",
                              onClick: () =>
                                handleStatusChange(row._id, "pending"),
                            },
                            {
                              label: "Rejected",
                              onClick: () =>
                                handleStatusChange(row._id, "rejected"),
                            },
                          ]}
                        />
                      </td>

                      <td className="table-td">
                        <div className="flex justify-center items-center relative">
                          <Dropdown
                            label={<>Download </>}
                            labelClass="flex items-center gap-2"
                            classMenuItems="w-32 min-w-[120px] top-full mt-1"
                            classItem="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            items={[
                              {
                                label: "English",
                                onClick: (e) => {
                                  downloadPDF(e, "en", row);
                                },
                              },
                              {
                                label: "French",
                                onClick: (e) => {
                                  downloadPDF(e, "fr", row);
                                },
                              },
                            ]}
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
      {/* Hidden Invoice for PDF Generation */}
      {selectedInvoice && (
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: "0",
            opacity: 0,
          }}
        >
          <Invoice
            invoiceData={selectedInvoice}
            selectedLanguage={selectedLanguage}
          />
        </div>
      )}
    </Card>
  );
};

export default TableUI;
