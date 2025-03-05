import Card from "../../../../components/combined/molecules/CardUIContainer";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";
import Button from "../../../../components/ui/molecules/Button";

const DashboardTableUI = ({
  columns,
  rows,
  tableFooterData,
  loading,
  dashboardEntries,
  globalFilter,
  setGlobalFilter,
  push
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
      <div className="flex justify-between items-center mb-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className=" flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center">
            <span className="w-full">
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
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="table-th font-bold text-left px-4 py-4"
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
                        {row.signatureDate}
                      </td>
                      <td className="table-td px-4 py-4">{row.dd}</td>
                      <td className="table-td px-4 py-4">
                        {row.financingDays}
                      </td>
                      <td className="table-td px-4 py-4">
                        {row.closingDays}
                      </td>
                      <td className="table-td px-4 py-4">{row.invoice}</td>
                      <td className="table-td px-4 py-4">{row.pmtReceived}</td>
                      <td className="table-td px-4 py-4 flex items-center">
                        <img
                          src={
                            row?.created_by?.avatar ||
                            "/assets/images/users/user-1.jpg"
                          } // Replace with actual avatar URL if available
                          alt={row?.created_by?.name}
                          className="block w-8 h-8 object-cover rounded-full mr-2"
                        />
                        {row?.created_by?.name}
                      </td>
                      <td className="table-td px-4 py-4">{row.amount}</td>
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
                          "dd",
                          "financingDays",
                          "closingDays",
                          "amount",
                        ].includes(column.key) ? (
                          <>
                            <p>Total</p>
                            <p>{calculateTotal(column.key)}</p>
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
