import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useInvoices from "../../functionality/page/useInvoices";

const InvoicesListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    invoices,
    setInvoices,
    paginatedInvoices, // Return paginated users
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
      <div className={`flex w-full justify-end mt-2 items-center ${totalCount <= pageSize && "hidden"}`}>
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(totalCount / pageSize)} // Correctly calculate the number of pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          initialPage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default InvoicesListingPage;
