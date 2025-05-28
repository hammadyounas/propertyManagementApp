import { useState } from "react";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";

const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  push,
  loading,
  emails,
  openDeleteModal,
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center justify-end">
            <span className="">
              <Button
                text="Send Email"
                onClick={() => push("/marketing-emails/send")}
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
                ) : emails?.length === 0 ? (
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
                      <td className="table-td">{row.subject}</td>
                      <td className="table-td">{row.title}</td>
                      <td className="table-td">
                        <div className="flex items-center justify-center">
                          <span>{row.description}</span>
                        </div>
                      </td>
                      <td className="table-td lowercase">
                        {row?.recipients
                          ?.slice(
                            0,
                            expandedRows[row._id] ? row?.recipients.length : 1
                          )
                          .map((receipt, index) => (
                            <p className="lowercase" key={index}>{receipt}</p>
                          ))}
                        {row?.recipients?.length > 1 && (
                          <p
                            onClick={() => toggleExpand(row._id)}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {expandedRows[row._id]
                              ? "Show Less"
                              : `+${row?.recipients.length - 1}`}
                          </p>
                        )}
                      </td>
                      <td className="table-td">
                        <div className="flex items-center justify-center">
                          <img
                            src={
                              row?.created_by?.avatar ||
                              "/assets/images/users/default.jpg"
                            }
                            alt={row?.created_by?.name}
                            className="block w-8 h-8 rounded-full mr-4"
                          />
                          <span>{row?.created_by?.name}</span>
                        </div>
                      </td>
                      <td className="table-td">
                        <div className="flex justify-center items-center">
                          <Tooltip content="Delete">
                            <Icon
                              onClick={() => openDeleteModal(row?._id)}
                              className="cursor-pointer text-[20px] mx-auto w-full"
                              icon={"heroicons-outline:trash"}
                            />
                          </Tooltip>
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
    </Card>
  );
};

export default TableUI;
