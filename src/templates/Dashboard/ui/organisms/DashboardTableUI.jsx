import { Icon } from "@iconify/react"; // ✅ Correct import
import Card from "../../../../components/combined/molecules/CardUIContainer";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import Button from "../../../../components/ui/molecules/Button";
import DropdownUINew from "../../../../components/ui/organisms/DropdownUINew";
import CountdownTimer from "../../../../libs/utils/countdownTimer";
import { dateFormat } from "../../../../libs/utils/helper";

const DashboardTableUI = ({
  columns,
  rows,
  tableFooterData,
  loading,
  dashboardEntries,
  globalFilter,
  setGlobalFilter,
  push,
  setStatusFilter,
  setSelectedFilter,
  selectedFilter,
}) => {
  const calculateTotal = (key) => {
    return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
  };
  const columnsFooter = [
    { key: "id", label: "ID" },
    { key: "signatureDate", label: "Signature Date" },
    { key: "dd", label: "DD" },
    { key: "financingDays", label: "Financing Days" },
    { key: "closingDays", label: "Closing Days" },
    { key: "invoice", label: "Invoice" },
    { key: "pmtReceived", label: "Payment Received" },
    { key: "created_by", label: "Created By" },
    { key: "amount", label: "Amount" },
  ];

  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center mb-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className=" flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center max-sm:justify-end gap-2 max-sm:mt-2">
          <DropdownUINew
              label={selectedFilter}
              wrapperClass="sm:w-40"
              labelClass="btn-secondary bg-gray-950 flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer"
              classMenuItems="w-48 left-0"
              classItem="p-2"
              onSelect={(value) => {
                setSelectedFilter(value === "pending" ? "Pending" : "Paid");
                setStatusFilter(value);
              }}
              items={[
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
              ]}
            />
            <span className="sm:w-full">
              <Button
                text="Add Entry"
                onClick={() => push("/dashboard/add")}
                className="btn-primary bg-primary-default w-full"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6 min-h-[70vh] relative">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 text-center">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="table-th font-bold text-center px-4 py-4"
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
                ) : dashboardEntries?.length === 0 ? (
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
                      <td className="table-td px-4 py-4">{i + 1}</td>
                      <td className="table-td px-4 py-4">
                        {dateFormat(row.signatureDate)}
                      </td>
                      <td className={`table-td px-4 py-4 `}>
                        <span
                          className={`${
                            row.dd > 0
                              ? "text-green-700 py-2 bg-green-200 px-2 rounded-full flex justify-center items-center"
                              : ""
                          }`}
                        >
                          <CountdownTimer
                            initialDays={
                              row.dd > 0 ? (
                                <>
                                  <div className="flex justify-center items-center gap-2 text-green-600">
                                    <Icon
                                      icon="majesticons:timer-line"
                                      className=""
                                    />{" "}
                                    {row.dd}
                                  </div>
                                </>
                              ) : (
                                row.dd
                              )
                            }
                          />
                        </span>
                      </td>
                      <td className={`table-td px-4 py-4 `}>
                        <span
                          className={`${
                            row.financingDays > 0 && row.dd === 0
                              ? "text-green-600 py-2 bg-green-200 px-2 rounded-full flex justify-center items-center"
                              : ""
                          }`}
                        >
                          <CountdownTimer
                            initialDays={
                              row.financingDays > 0 && row.dd === 0 ? (
                                <>
                                  <div className="flex justify-center items-center gap-2 text-green-600">
                                    <Icon
                                      icon="majesticons:timer-line"
                                      className=""
                                    />{" "}
                                    {row.financingDays}
                                  </div>
                                </>
                              ) : (
                                row.financingDays
                              )
                            }
                          />
                        </span>
                      </td>
                      <td className={`table-td px-4 py-4 `}>
                        <span
                          className={`${
                            row.closingDays > 0 && row.financingDays === 0
                              ? "text-green-600 py-2 bg-green-200 px-2 rounded-full flex justify-center items-center"
                              : ""
                          }`}
                        >
                          <CountdownTimer
                            initialDays={
                              row.closingDays > 0 && row.financingDays === 0 ? (
                                <>
                                  <div className="flex justify-center items-center gap-2 text-green-600">
                                    <Icon
                                      icon="majesticons:timer-line"
                                      className=""
                                    />{" "}
                                    {row.closingDays}
                                  </div>
                                </>
                              ) : (
                                row.closingDays
                              )
                            }
                          />
                        </span>
                      </td>
                      <td className="table-td px-4 py-4">{row.invoice}</td>
                      <td className="table-td px-4 py-4">
                        {row.pmtReceived === "paid" ? (
                          <>
                            <div className="flex justify-center items-center gap-2 text-green-600">
                              <Icon icon="fa:flag" /> {row.pmtReceived}
                            </div>
                          </>
                        ) : (
                          row.pmtReceived
                        )}
                      </td>
                      <td className="table-td px-4 py-4 flex justify-center items-center">
                        <img
                          src={
                            row?.created_by?.avatar ||
                            "/assets/images/users/default.jpg"
                          } // Replace with actual avatar URL if available
                          alt={row?.created_by?.name}
                          className="block w-8 h-8 object-cover rounded-full mr-2"
                        />
                        {row?.created_by?.name}
                      </td>
                      <td className="table-td px-4 py-4">
                        $ {row.amount.toLocaleString()}
                      </td>
                      {/* <td className="table-td px-4 py-4">
                      <span
                        className={`inline-block px-3 min-w-[90px] text-center py-1 rounded-full bg-opacity-25 ${
                          row.commission_collected === "Completed"
                            ? "text-green-600 bg-green-200"
                            : "text-red-600 bg-red-200"
                        }`}
                      >
                        {row.commission_collected}
                      </span>
                    </td> */}
                    </tr>
                  ))
                )}
              </tbody>
              {dashboardEntries?.length > 0 && (
                <tfoot className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    {columnsFooter?.map((column, i) => (
                      <td key={i} className="table-td font-semibold px-4 py-4">
                        {[
                          // "dd",
                          // "financingDays",
                          // "closingDays",
                          "amount",
                        ].includes(column.key) ? (
                          <>
                            <p>Total</p>
                            <p>
                              $ {calculateTotal(column.key).toLocaleString()}
                            </p>
                          </>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardTableUI;
