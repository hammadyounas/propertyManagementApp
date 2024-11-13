import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useAcm from "../../functionality/page/useAcm";

const ACMListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    acms,
    setAcms,
    paginatedAcms, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
  } = useAcm();

  return (
    <>
      <Table
        rows={paginatedAcms} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
      />
      <div className="flex w-full justify-end mt-2 items-center">
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(acms.length / pageSize)} // Correctly calculate the number of pages
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

export default ACMListingPage;
