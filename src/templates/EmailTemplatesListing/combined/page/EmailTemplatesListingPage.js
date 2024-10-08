import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useEmailTemplates from "../../functionality/page/useEmailTemplates";

const EmailTemplatesListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    templates,
    setTemplates,
    paginatedTemplates, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
  } = useEmailTemplates();

  return (
    <>
      <Table
        rows={paginatedTemplates} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
      />
      <div className="flex w-full justify-end mt-2 items-center">
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(templates.length / pageSize)} // Correctly calculate the number of pages
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

export default EmailTemplatesListingPage;
