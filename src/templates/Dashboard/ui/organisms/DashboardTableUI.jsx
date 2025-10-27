import Card from "../../../../components/combined/molecules/CardUIContainer";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import NoDataFound from "../../../../components/ui/atoms/NoDataFound";
import Button from "../../../../components/ui/molecules/Button";
import DropdownUINew from "../../../../components/ui/organisms/DropdownUINew";
import CountdownTimer from "../../../../libs/utils/countdownTimer";
import { dateFormat } from "../../../../libs/utils/helper";
import { Icon } from "@iconify/react";
import ReactSelect from "react-select";

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
  handleOpenCommentModal,
  brokerOptions,
  setBrokerOptions,
  selectedBroker,
  setSelectedBroker,
}) => {
  const calculateTotal = (key) => {
    return dashboardEntries.reduce(
      (total, row) => total + (Number(row[key]) || 0),
      0
    );
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
    { key: "comment", label: "Comment" },
    { key: "amount", label: "Amount" },
    { key: "action", label: "Action" },
  ];

  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder={"🔎︎ Search..."} className={'md:w-[30%] w-full'} /> */}
        <div className="w-full flex gap-2">
          {/*search by react select  */}
          <ReactSelect
            placeholder="Select Broker"
            className="xl:w-[50%] md:w-[50%] w-full capitalize font-normal text-sm"
            value={selectedBroker}
            onChange={(option) => {
              if (option?.value === "all") {
                setSelectedBroker(null); // Clear filter
              } else {
                setSelectedBroker(option); // Set selected broker
              }
            }}
            options={brokerOptions}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white", // Button background color
                padding: "0.3rem 0.2rem", // Adjust button padding
                cursor: "pointer", // Pointer cursor
                borderColor: "#666666", // Border color
                "&:focus": {
                  borderColor: "#666666", // Change border color on focus
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "black", // Placeholder text color
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#F1B62E" : "white", // Background color for selected option
                color: state.isSelected ? "white" : "black", // Text color for selected option
                padding: "0.6rem 0.8rem", // Padding for option items
                "&:hover": {
                  backgroundColor: "#F4f5f7", // Hover effect for options
                  color: "black",
                },
              }),
            }}
          />
        </div>
        <div className="w-full flex items-center justify-end gap-2 max-sm:mt-2">
          {/* search filter by invoice status */}
          <DropdownUINew
            label={selectedFilter ? selectedFilter : "Invoice Status"}
            wrapperClass="sm:w-40"
            labelClass="btn-secondary bg-primary-default flex items-center justify-center gap-2 px-4 sm:py-3 py-2 rounded cursor-pointer text-sm"
            classMenuItems="w-40 left-0"
            classItem="p-2 text-sm"
            onSelect={(value) => {
              if (value === "all") {
                setSelectedFilter("All");
                setStatusFilter(""); // clear filter
              } else {
                const labelMap = {
                  paid: "Paid",
                  pending: "Pending",
                  submitted: "Submitted",
                };
                setSelectedFilter(labelMap[value]);
                setStatusFilter(value);
              }
            }}
            items={[
              { label: "All", value: "all" },
              { label: "Paid", value: "paid" },
              { label: "Pending", value: "pending" },
              { label: "Submitted", value: "submitted" },
            ]}
          />
          <span className="">
            <Button
              text="Add Entry"
              onClick={() => push("/dashboard/add")}
              className="btn-primary bg-primary-default w-full font-normal"
            />
          </span>
        </div>

        <div className=" flex flex-wrap items-center justify-end"></div>
      </div>
      <div className="overflow-x-auto -mx-6 min-h-[70vh]  relative">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 text-center">
              <thead className="bg-slate-200 dark:bg-slate-700 whitespace-nowrap ">
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
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
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
                     <NoDataFound />
                    </td>
                  </tr>
                ) : (
                  dashboardEntries?.map((row, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700 whitespace-nowrap"
                    >
                      <td className="table-td sm:p-4 p-2">{i + 1}</td>
                      <td className="table-td sm:p-4 p-2">
                        {dateFormat(row.signatureDate)}
                      </td>
                      <td className={`table-td sm:p-4 p-2 `}>
                        <span
                          className={`${
                            row.dd > 0 && row.pmtReceived === 'non paid'
                              ? "text-green-700 py-2 bg-green-200 px-2 rounded-full flex justify-center items-center"
                              : ""
                          }`}
                        >
                          <CountdownTimer
                            initialDays={
                              row.dd > 0 && row.pmtReceived === 'non paid' ? (
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
                      <td className={`table-td sm:p-4 p-2 `}>
                        <span
                          className={`${
                            row.financingDays > 0 && row.dd  === 0 && row.pmtReceived === 'non paid'
                              ? "text-green-600 py-2 bg-green-200 px-2 rounded-full flex justify-center items-center"
                              : ""
                          }`}
                        >
                          <CountdownTimer
                            initialDays={
                              row.financingDays > 0 && row.dd === 0 && row.pmtReceived === 'non paid' ? (
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
                      <td className={`table-td sm:p-4 p-2 `}>
                        <span
                          className={`${
                            row.closingDays > 0 &&
                            row.financingDays === 0 &&
                            row.dd === 0
                            && row.pmtReceived === 'non paid'
                              ? "text-green-600 py-2 bg-green-200 px-2 rounded-full flex justify-center items-center"
                              : ""
                          }`}
                        >
                          <CountdownTimer
                            initialDays={
                              row.closingDays > 0 && row.financingDays === 0 && row.pmtReceived === 'non paid' ? (
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
                      <td className="table-td sm:p-4 p-2">{row.invoice}</td>
                      <td className="table-td sm:p-4 p-2">
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
                      <td className="table-td sm:p-4 p-2 flex justify-center items-center">
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
                      <td className="table-td sm:p-4 p-2 first-letter:uppercase">
                        {row.comment ? (
                          <div className="flex justify-center items-center gap-2">
                            <Button text='View' onClick={() => handleOpenCommentModal(row.comment)} className="bg-transparent text-green-600 hover:border-b border-green-600 py-0 px-0 text-center rounded-none" />
                          </div>
                        ) : (
                          row.comment || "N/A"
                        )}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        $ {row.amount.toLocaleString()}
                      </td>
                      <td className="table-td sm:p-4 p-2 flex justify-center items-center">
                        <Icon
                          onClick={() => push(`/dashboard/edit/${row._id}`)}
                          className="cursor-pointer text-[20px] mx-4"
                          icon={"heroicons:pencil-square"}
                        />
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
                <tfoot className="bg-slate-100 dark:bg-slate-700 whitespace-nowrap ">
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
