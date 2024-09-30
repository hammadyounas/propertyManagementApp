import useProperty from "../../functionality/page/useProperty";
import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";

const PropertiesListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    paginatedProperties, // Use paginated properties here
    pageSize,
    handlePageChange,
    currentPage,
    properties,
  } = useProperty();

  return (
    <>
      <Table
        rows={paginatedProperties} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="flex w-full justify-end mt-2 items-center">
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(properties.length / pageSize)} // Correctly calculate the number of pages
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

export default PropertiesListingPage;
