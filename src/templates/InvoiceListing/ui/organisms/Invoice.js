import { useRef } from "react";

const Invoice = ({ invoiceData }) => {
  const invoiceRef = useRef();

  const ContactInfo = ({ label, value, link }) => (
    <div className="grid grid-cols-3 text-xs text-black-500">
      <p className="font-medium ">{label}</p>
      {link ? (
        <a href={link} className="">
          {value}
        </a>
      ) : (
        <p className="whitespace-nowrap">{value}</p>
      )}
    </div>
  );

  const Border = () => <div className="border-b-4 border-b-[#fbb42c] w-full"></div>;

  return (
    <div
      ref={invoiceRef}
      id="invoice"
      className=" bg-[#faf1e6] text-black w-[595px] h-[842px]"
    >

      {/* header section */}
      <div className="flex justify-between">
        <div className="p-4">
          <img
            src="/assets/images/logo/BLACK-LOGO.png"
            alt="logo"
            className="w-22 h-16"
          />
        </div>

        <div className="relative flex justify-end text-black text-xs p-4 w-[50%]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/assets/images/all-img/invoice_bg.png"
              alt="background"
              className=""
            />
          </div>

          {/* Content */}
          <div className="absolute z-10 w-[70%]">
            <h4 className="text-lg font-bold tracking-wider text-center">
              Get In Touch
            </h4>
            <div className="mt-2 ">
              <ContactInfo label="PHONE:" value="+1 514-929-SELL (7355)" />
              <ContactInfo
                label="EMAIL:"
                value="INFO@BUZZREALTIES.CA"
                link="mailto:INFO@BUZZREALTIES.CA"
              />
              <ContactInfo label="WEBSITE:" value="BUZZREALTIES.CA" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] text-sm text-black-500 mx-auto mt-16">
        {/* location */}
        <div className="flex justify-between w-full"> 
          {/* detail */}
        <div className="">
      <p>LES IMMEUBLES BUZZ INC.</p>
      <p>2200-1250 RENE LEVESQUE W.,</p>
      <p>MONTREAL, H3B4W8</p>
        </div>

        {/* date and invoice number */}
        <div className="text-right ">
        <p>INVOICE: {invoiceData?.invoiceNumber || ""}   </p>
        <p>DATE: {invoiceData?.invoiceDate || Date.now}</p>
        </div>
        </div>

        <p className="text-[13px] py-4">THIS IS TO CONFIRM THE COMMISSION FOR THE BROKERAGE TRANSACTION</p>
        <Border />

        <div className="py-4 space-y-2 text-sm">
          <p>Subject Property : {invoiceData?.buyer?.name}</p>
          <p>Building address(es) : {invoiceData?.buyer?.address}</p>
          <p>Property type : {invoiceData?.seller?.licence_type || "Residential"}</p>
          <p>Transaction amount : ${invoiceData?.buyer?.address || ''}</p>
          <p>Total commission payable  :  ${invoiceData?.totalCommissionPayable?.toFixed(2)}</p>
        </div>
      </div>

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

      <h3 className="mt-4 font-semibold">
        Total Amount: ${invoiceData?.totalCommissionPayable?.toFixed(2)}
      </h3>
    </div>
  );
};

export default Invoice;
