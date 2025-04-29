import { useRef } from "react";

const Invoice = ({ invoiceData, selectedLanguage= "en" }) => {
  const invoiceRef = useRef();

  // Function to divide the items into chunks of 3
  const chunkItems = (items, chunkSize) => {
    const result = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      result.push(items.slice(i, i + chunkSize));
    }
    return result;
  };

  const ContactInfo = ({ label, value, link }) => (
    <div className="grid grid-cols-3 text-[0.7rem] pl-2 text-black-500">
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

  // Chunk the items into groups of 2
  const chunkedItems = chunkItems(invoiceData?.items || [], 2);

  return (
    <div
      ref={invoiceRef}
      id="invoice"
      className="relative bg-[#faf1e6] text-black w-full h-full min-h-[842px] min-w-[595px] flex flex-col"
    >
      {chunkedItems.map((chunk, chunkIndex) => (
        <div key={chunkIndex}>
          {/* header section */}
          <header className="flex justify-between w-full border-2 border-transparent">
            <div className="p-4 border-2 border-transparent">
              <img
                src="/assets/images/logo/BLACK-LOGO.png"
                alt="logo"
                className="w-22 h-16 object-contain"
              />
            </div>

            <div className="relative flex justify-end text-black text-xs p-4 w-[40%]">
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
          </header>

          <main className="w-[90%] text-[0.9rem] text-black-500 mx-auto mt-16 flex-grow">
            {/* location */}
            {chunkIndex === 0 && (
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
                    INV-{invoiceData?.invoiceNumber || ""}{" "}
                  </p>
                  <p>DATE : {invoiceData?.invoiceDate || Date.now}</p>
                </div>
              </div>
            )}

            <p className="text-[0.9rem] pt-8">
              {selectedLanguage !== "en" ? "FACTURÉ À" : "INVOICED TO"}
            </p>

            <p className="text-[0.9rem] py-4">
              {selectedLanguage !== "en"
                ? "LA PRÉSENTE EST POUR VOUS CONFIRMER LA COMMISSION POUR LA TRANSACTION DECOURTAGE"
                : "THIS IS TO CONFIRM THE COMMISSION FOR THE BROKERAGE TRANSACTION."}
            </p>
            <Border />

            <div className="py-4 grid grid-cols-2 text-[0.9rem] gap-y-2">
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
                {selectedLanguage !== "en"
                  ? "Type de propriété"
                  : "Property Type "}{" "}
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
                  ? "a Les Immeubles Buzz inc"
                  : " Total commission payable "}{" "}
                :
              </p>
              <p>$ {invoiceData?.totalCommissionPayable?.toFixed(2)}</p>
            </div>

            <Border />

            {/* Paginated invoice items */}
            <div>
              {chunk.map((item, index) => (
                <div
                  key={index}
                  className="invoice-item py-4 grid grid-cols-2 text-[0.9rem] gap-y-2"
                >
                  <p className="font-medium">
                    {selectedLanguage !== "en"
                      ? "Montant de la commission"
                      : " Commission amount "}{" "}
                    :
                  </p>
                  <p>$ {item?.price?.toFixed(2)}</p>

                  <p className="font-medium">
                    {selectedLanguage !== "en"
                      ? "Plus TPS 5% "
                      : "  Plus 5% GST "}{" "}
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
            </div>

            <Border />

            {/* Display Thank You message only on the last chunk */}
            {chunkIndex === chunkedItems.length - 1 && (
              <p className="py-4">
                {selectedLanguage !== "en"
                  ? "Merci et au plaisir de refaire affaire ensemble !"
                  : "Thank you and we look forward to doing business together again! "}
              </p>
            )}
          </main>

          {/* Footer outside the chunk loop */}
          <footer className="absolute bottom-0 left-0 w-full flex justify-end items-end h-full my-auto">
            <img
              src="/assets/images/all-img/invoice_footer.png"
              alt="footer"
              className=""
            />
          </footer>
          <div className="page-break"></div>
        </div>
      ))}
    </div>
  );
};

export default Invoice;
