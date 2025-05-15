import Table from "../organisms/TableUIContainer";
import useInvoices from "../../functionality/page/useInvoices";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";

const InvoicesListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    invoices,
    setInvoices,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    downloadPDF,
    selectedInvoice,
    setSelectedInvoice,
    selectedLanguage,
    totalCount,
  } = useInvoices();

  return (
    <>
      <Table
        rows={invoices} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        loading={loading}
        invoices={invoices}
        setInvoices={setInvoices}
        downloadPDF={downloadPDF}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
        selectedLanguage={selectedLanguage}
      />
      <div
        className={`flex w-full justify-end mt-2 items-center ${
          totalCount <= pageSize && "hidden"
        }`}
      >
        <PaginationUI
          pageCount={Math.ceil(totalCount / pageSize)}
          onPageChange={({ selected }) => handlePageChange(selected)}
          initialPage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default InvoicesListingPage;
