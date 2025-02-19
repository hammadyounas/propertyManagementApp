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
    loading
  } = useInvoices();

  return (
    <>
      <Table
        rows={paginatedInvoices} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        loading={loading}
        invoices={invoices}
      />
      <div className={`flex w-full justify-end mt-2 items-center ${invoices?.length <= pageSize && "hidden"}`}>
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(invoices.length / pageSize)} // Correctly calculate the number of pages
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
