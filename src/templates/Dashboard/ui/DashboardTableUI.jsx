import Card from "../../../components/combined/molecules/CardUIContainer";

const DashboardTableUI = ({ columns, rows, tableFooterData }) => {
  return (
    <Card noborder>
      <div className="overflow-x-auto -mx-6 min-h-[70vh] relative">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th key={i} scope="col" className="table-th font-bold text-left px-4 py-4">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {rows?.map((row, i) => (
                  <tr key={i} className="even:bg-slate-200 dark:even:bg-slate-700">
                    <td className="table-td px-4 py-4">{row.id}</td>
                    <td className="table-td px-4 py-4">{row.signatureDate}</td>
                    <td className="table-td px-4 py-4">{row.dd}</td>
                    <td className="table-td px-4 py-4">{row.financing}</td>
                    <td className="table-td px-4 py-4">{row.closing}</td>
                    <td className="table-td px-4 py-4">{row.invoice}</td>
                    <td className="table-td px-4 py-4">{row.pmtReceived}</td>
                    <td className="table-td px-4 py-4">{row.pmtBroker}</td>
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
                ))}
              </tbody>
              <tfoot className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <td key={i} className="table-td font-semibold px-4 py-4">
                        <p>Total</p>
                      {tableFooterData[i]?.label || ""}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardTableUI;
