import { useRef } from "react";

const Invoice = ({ invoiceData }) => {
  const invoiceRef = useRef();

  return (
    <div ref={invoiceRef} id="invoice" className=" bg-[#faf1e6] text-black w-[595px] h-[842px]">
        <div className="flex justify-between">
          <div className="p-4">
            <img src="/assets/images/logo/BLACK-LOGO.png" alt="logo" className="w-22 h-16" />
            </div>

            <div className="text-xs bg-[#fbb42c]">
              <div className="p-4">
              <h4 className="text-lg font-bold tracking-wider">Get In Touch </h4>
              <p>PHONE: +1 514-929-SELL (7355)</p>
              <p>EMAIL:  INFO@BUZZREALTIES.CA</p>
              <p>WEBSITE: BUZZREALTIES.CA</p>
              </div>
            </div>

        </div>
      <h2 className="text-2xl font-bold">Invoice</h2>
      <p>Invoice Number: {invoiceData?.invoiceNumber} || </p>
      <p>Date: {invoiceData?.invoiceDate}</p>

      <h3 className="mt-4 font-semibold">Bill To:</h3>
      <p>{invoiceData?.buyer?.name}</p>
      <p>{invoiceData?.buyer?.address}</p>

      <h3 className="mt-4 font-semibold">Bill From:</h3>
      <p>{invoiceData?.seller?.name}</p>
      <p>{invoiceData?.seller?.address}</p>

      <h3 className="mt-4 font-semibold">Items</h3>
      <table className="min-w-full mt-2 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Item</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">GST</th>
            <th className="border p-2">QST</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.items?.map((item, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{item?.itemName}</td>
              <td className="border p-2">${item?.price?.toFixed(2)}</td>
              <td className="border p-2">${item?.gst?.toFixed(2)}</td>
              <td className="border p-2">${item?.qst?.toFixed(2)}</td>
              <td className="border p-2">${item?.total?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4 font-semibold">Total Amount: ${invoiceData?.totalCommissionPayable?.toFixed(2)}</h3>
    </div>
  );
};

export default Invoice;
