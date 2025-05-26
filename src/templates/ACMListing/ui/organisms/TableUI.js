import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import { dateFormat } from "../../../../libs/utils/helper";

const TableUI = ({ columns, rows, globalFilter, setGlobalFilter, push, acms }) => {
  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center justify-end">
            <span className="">
              <Button
                text="Add ACM"
                onClick={() => push("/acms/create")}
                className="btn-primary bg-primary-default w-full"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 text-center">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th key={i} scope="col" className="table-th font-bold text-center">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {acms?.map((row, i) => (
                  <tr key={i} className="even:bg-slate-200 dark:even:bg-slate-700">
                    <td className="table-td">{dateFormat(row.date_of_sale) }</td>
                    <td className="table-td">{row.property.title}</td>
                    <td className="table-td">{row.unit_sold}</td>
                    <td className="table-td">$ {row.sale_price}</td>
                    <td className="table-td">$ {row.net_operating_income}</td>
                    <td className="table-td">{row.cap_rate}</td>
                    <td className="table-td">
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
              <tfoot className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <td key={i} className="table-td font-semibold">
                      {i === 0 ? <p>Average</p> : ""}
                      {i === 3 ? <p>2000</p> : ""}
                      {i === 4 ? <p>4.1%</p> : ""}
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

export default TableUI;
