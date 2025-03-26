import { useRef } from "react";

const Invoice = ({ invoiceData, selectedLanguage }) => {
  const invoiceRef = useRef();

  const ContactInfo = ({ label, value, link }) => (
    <div className="grid grid-cols-3 text-[0.6rem] pl-4 text-black-500">
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

  const Border = () => (
    <div className="border-b-4 border-b-[#fbb42c] w-full"></div>
  );

  return (
    <div
      ref={invoiceRef}
      id="invoice"
      className="relative bg-[#faf1e6] text-black w-[595px] h-[842px]"
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

      <div className="w-[90%] text-[0.65rem] text-black-500 mx-auto mt-16">
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
            <p>
              {selectedLanguage !== "en" ? "FACTURE" : "INVOICE"} :{" "}
              {invoiceData?.invoiceNumber || ""}{" "}
            </p>
            <p>DATE : {invoiceData?.invoiceDate || Date.now}</p>
          </div>
        </div>

        <p className="text-[0.65rem] pt-8">
          {selectedLanguage !== "en" ? "FACTURÉ À" : "INVOICED TO"}
        </p>

        <p className="text-[0.65rem] py-4">
          {selectedLanguage !== "en"
            ? "LA PRÉSENTE EST POUR VOUS CONFIRMER LA COMMISSION POUR LA TRANSACTION DECOURTAGE"
            : "THIS IS TO CONFIRM THE COMMISSION FOR THE BROKERAGE TRANSACTION."}
        </p>
        <Border />

        <div className="py-4 grid grid-cols-2 text-[0.65rem] gap-y-2">
          <p className="font-medium">
            {selectedLanguage !== "en"
              ? "Immeuble en Rubrique"
              : "Subject Property"}{" "}
            :
          </p>
          <p>{invoiceData?.buyer?.name}</p>

          <p className="font-medium">
            {selectedLanguage !== "en"
              ? "Adresse(s) De l'Immeuble"
              : "Building address(es) "}{" "}
            :
          </p>
          <p>{invoiceData?.buyer?.address}</p>

          <p className="font-medium">
            {selectedLanguage !== "en" ? "Type de propriété" : "Property Type "}{" "}
            :
          </p>
          <p>{invoiceData?.seller?.licence_type || "Residential"}</p>

          <p className="font-medium">
            {selectedLanguage !== "en"
              ? "Montant de la transaction"
              : " Transaction amount "}{" "}
            :
          </p>
          <p>$ {invoiceData?.buyer?.transactionAmount || ""}</p>

          <p className="font-medium">
            {selectedLanguage !== "en"
              ? "Commission totale payable a Les Immeubles Buzz inc"
              : " Total commission payable "}{" "}
            :
          </p>
          <p>$ {invoiceData?.totalCommissionPayable?.toFixed(2)}</p>
        </div>

        <Border />

        {/* total amount*/}
        {invoiceData?.items?.map((item, index) => (
          <div
            key={index}
            className="py-4 grid grid-cols-2 text-[0.65rem] gap-y-2"
          >
            <p className="font-medium">
              {selectedLanguage !== "en"
                ? "Montant de la commission"
                : " Commission amount "}{" "}
              :
            </p>
            <p>${item?.price?.toFixed(2)}</p>

            <p className="font-medium">
              {selectedLanguage !== "en" ? "Plus TPS 5% " : "  Plus 5% GST "}{" "}
              (__________) :
            </p>
            <p>$ {item?.gst?.toFixed(2)}</p>

            <p className="font-medium">
              {selectedLanguage !== "en"
                ? "Plus TVQ 9,975%"
                : " Plus 9.975% QST "}{" "}
              (__________):
            </p>
            <p>$ {item?.qst?.toFixed(2)}</p>

            <p className="font-medium">Total :</p>
            <p>$ {item?.total?.toFixed(2)}</p>
          </div>
        ))}
        <Border />

        <p className="py-4">
          {selectedLanguage !== "en"
            ? "Merci et au plaisir de refaire affaire ensemble !"
            : "Thank you and we look forward to doing business together again! "}
        </p>
      </div>

      {/* footer */}
      <div className="absolute bottom-0 left-0 w-full">
        <img
          src="/assets/images/all-img/invoice_footer.png"
          alt="footer"
          className=""
        />
      </div>
    </div>
  );
};

export default Invoice;
