import React from "react";
import Button from "../../../../components/ui/atoms/Button";

function NotesUI({ columns, rows }) {
  return (
    <div className="my-4">
      <div className="flex justify-between items-center my-2">
        <h2 className="text-lg">Notes</h2>
        <button className="bg-primary-default text-white px-4 py-2">
          Add Notes +
        </button>
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
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className=" even:bg-slate-200 dark:even:bg-slate-700"
                  >
                    <td className="table-td text-primary-default font-bold ">
                      {row.salesperson_name}
                    </td>
                    <td className="table-td ">{row.notes}</td>
                    <td className="table-td ">{row.date}</td>
                    <td className="table-td ">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesUI;
