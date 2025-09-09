import { useRouter } from "next/navigation";
import React from "react";

function SalespersonUI({ salesperosonDataRows, salespersonColumns }) {
  const router = useRouter();
  return (
    <div className="my-4">
      <div className="flex justify-start items-center my-2">
        <h2 className="text-lg ">Brokers</h2>
        {/* <button className="bg-primary-default text-white px-4 py-2">
              Upload Documents
            </button> */}
      </div>

      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {salespersonColumns?.map((column, i) => (
                    <th key={i} scope="col" className=" table-th font-bold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {salesperosonDataRows?.map((row, i) => (
                  <tr
                    key={i}
                    className=" even:bg-slate-200 dark:even:bg-slate-700"
                  >
                    <td
                      className="table-td text-primary-default font-semibold cursor-pointer"
                      onClick={() => router.push(`/broker/view/${row._id}`)}
                    >
                      {row.name}
                    </td>
                    <td className="table-td lowercase">{row.email}</td>
                    <td className="table-td ">{row.contact_number}</td>
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

export default SalespersonUI;
