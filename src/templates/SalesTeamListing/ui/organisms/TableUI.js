import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
const TableUI = ({ columns, rows, globalFilter, setGlobalFilter, push }) => {
  return (
    <Card noborder>
      <div className="flex justify-between items-center mb-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className=" flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center">
            <span className="w-full">
              <Button
                text="Add User"
                onClick={() => {}}
                className="btn-primary bg-primary-default w-full"
              />
            </span>
          </div>
        </div>
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
                    <td className="table-td ">
                      <div className="flex items-center">
                        <img
                          src={"/assets/images/users/user-1.jpg"}
                          alt=""
                          className="block w-8 h-8 object-cover rounded-full mr-2"
                        />
                        <span className="text-primary-default font-bold cursor-pointer">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="table-td ">{row.phone}</td>
                    <td className="table-td ">{row.email}</td>
                    <td className="table-td ">
                      <span className="block w-full">
                        <span
                          className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
      ${row.status === "active" ? "text-green-600 bg-green-200" : ""}
      ${row.status === "in active" ? "text-red-600 bg-red-200" : ""}
    `}
                        >
                          {row.status}
                        </span>
                      </span>
                    </td>
                    <td className="table-td ">
                      <div className="flex">
                        <Icon
                          onClick={() => {}}
                          className="cursor-pointer text-[20px]"
                          icon={"heroicons:eye"}
                        />
                        <Icon
                          onClick={() => {}}
                          className="cursor-pointer text-[20px] mx-4"
                          icon={"heroicons:pencil-square"}
                        />

                        <Icon
                          onClick={() => {}}
                          className="cursor-pointer text-[20px]"
                          icon={"heroicons-outline:trash"}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TableUI;
