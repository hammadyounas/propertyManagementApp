import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
  invoices,
}) => {
  const generatePDF = (invoiceData) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Invoice", 80, 20);

    // Invoice Details Box (Left Aligned with Light Gray Background)
    doc.setFillColor(230, 230, 230); // Light gray background
    doc.rect(14, 30, 190, 30, "F"); // Rectangle box for invoice details

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(`Invoice Number: ${invoiceData?.invoiceNumber}`, 18, 38);
    doc.text(`Invoice Date: ${invoiceData?.invoiceDate}`, 18, 44);
    doc.text(`Due Date: ${invoiceData?.dueDate}`, 18, 50);
    doc.text(`Status: ${invoiceData?.status}`, 18, 56);

    // Bill from & Bill to section
    doc.setFontSize(12);
    doc.text("Bill From:", 14, 70);
    doc.text(`Name: ${invoiceData?.seller?.name}`, 14, 78);
    doc.text(`Address: ${invoiceData?.seller?.address}`, 14, 86);
    doc.text(`Email: ${invoiceData?.seller?.email}`, 14, 94);
    doc.text(`Phone Number: ${invoiceData?.seller?.contact_number}`, 14, 102);

    doc.text("Bill To:", 120, 70);
    doc.text(`Name: ${invoiceData?.buyer?.name}`, 120, 78);
    doc.text(`Address: ${invoiceData?.buyer?.address}`, 120, 86);
    doc.text(`Email: ${invoiceData?.buyer?.email}`, 120, 94);
    doc.text(`Phone Number: ${invoiceData?.buyer?.phoneNumber}`, 120, 102);

    // Property Details
    doc.text("Property Details:", 14, 118);
    doc.text(`Title: ${invoiceData?.property?.title}`, 14, 126);
    doc.text(`Type: ${invoiceData?.property?.property_type}`, 14, 134);
    doc.text(`Description: ${invoiceData?.property?.description}`, 14, 142);
    doc.text(`Address: ${invoiceData?.property?.address}`, 14, 150);

    // Table for Items
    doc.autoTable({
      startY: 160,
      head: [
        ["Item", "Description", "Price", "GST (5%)", "QST (9.75%)", "Total"],
      ],
      body: invoiceData?.items?.map((item) => [
        item?.itemName,
        item?.description,
        `$${item?.price?.toFixed(2)}`,
        `$${item?.gst?.toFixed(2)}`,
        `$${item?.qst?.toFixed(2)}`,
        `$${item?.total?.toFixed(2)}`,
      ]),
      styles: { fontSize: 10, cellPadding: 3 },
    });

    let finalY = doc.autoTable.previous.finalY;

    // Summary Table
    doc.autoTable({
      startY: finalY + 10,
      head: [["Summary", "Amount"]],
      body: [
        [
          "Total Commission Payable",
          `$${invoiceData?.totalCommissionPayable?.toFixed(2) || 0}`,
        ],
        [
          "Commission Amount",
          `$${invoiceData?.commissionAmount?.toFixed(2) || 0}`,
        ],
        ["Plus GST (5%)", `$${invoiceData?.totalGst?.toFixed(2) || 0}`],
        ["Plus QST (9.75%)", `$${invoiceData?.totalQst?.toFixed(2) || 0}`],
        ["Total", `$${invoiceData?.totalCommissionPayable?.toFixed(2) || 0}`],
      ],
      styles: { fontSize: 10, cellPadding: 3 },
    });

    finalY = doc.autoTable.previous.finalY;

    doc.save(`${invoiceData?.invoiceNumber}_invoice.pdf`);
  };

  return (
    <Card noborder>
      <div className="flex justify-between items-center mb-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center">
            <span className="w-full">
              <Button
                text="Create Invoice"
                onClick={() => push("/invoices/create")}
                className="btn-primary bg-primary-default w-full"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns.map((column, i) => (
                    <th key={i} scope="col" className="table-th font-bold">
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
                  rows.map((row, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td">{row.invoiceNumber}</td>
                      <td className="table-td">{row.invoiceDate}</td>
                      <td className="table-td">
                        <div className="flex items-center">
                          <span className="text-primary-default font-bold cursor-pointer">
                            {row.client_name || row?.buyer?.name}
                          </span>
                        </div>
                      </td>
                      <td className="table-td">
                        {row.client_address || row?.buyer?.address}
                      </td>
                      <td className="table-td">
                        {row.responsible_broker || row?.seller?.name}
                      </td>
                      <td className="table-td">
                        {row.notary_date || row?.instrumentalNotary}
                      </td>
                      <td className="table-td">
                        {row.commissions_payable || row?.totalCommissionPayable}
                      </td>
                      <td className="table-td">
                        <span className="block w-full">
                          <span
                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25
                          ${
                            row?.status === "partially paid" &&
                            "text-blue-600 bg-blue-200"
                          }
                          ${
                            row?.status === "refunded" &&
                            "text-purple-600 bg-purple-200"
                          }
                          ${
                            row?.status === "cancelled" &&
                            "text-gray-600 bg-gray-200"
                          }
                          ${
                            row?.tatus === "overdue" &&
                            "text-orange-600 bg-orange-200"
                          }
                          ${
                            row?.status === "paid" &&
                            "text-teal-600 bg-teal-200"
                          }
                          ${
                            row?.status === "sent" &&
                            "text-indigo-600 bg-indigo-200"
                          }
                          ${
                            row?.status === "pending" &&
                            "text-yellow-600 bg-yellow-200"
                          }`}
                          >
                            {row?.status}
                          </span>
                        </span>
                      </td>
                      <td className="table-td">
                        <div className="flex">
                          <Tooltip content="View">
                            <Icon
                              onClick={() => generatePDF(row)}
                              className="cursor-pointer text-[20px]"
                              icon={"heroicons:arrow-down-tray"}
                            />
                          </Tooltip>
                          {/* <Tooltip content="Edit">
                          <Icon
                            onClick={() => {}}
                            className="cursor-pointer text-[20px] mx-4"
                            icon={"heroicons:pencil-square"}
                          />
                        </Tooltip>
                        <Tooltip content="Delete">
                          <Icon
                            onClick={() => {}}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons-outline:trash"}
                          />
                        </Tooltip> */}
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
