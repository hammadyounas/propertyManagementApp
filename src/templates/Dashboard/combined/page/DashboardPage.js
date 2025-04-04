import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useDashboard from "../../functionality/page/useDashboard";
import { tableFooterData } from "../../functionality/constants/data";

const DashboardPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    paginatedDashboardEntries, // Use paginated properties here
    pageSize,
    handlePageChange,
    currentPage,
    push,
    dashboardEntries,
    loading, 
  } = useDashboard();

  return (
    <>
      <Table
        rows={paginatedDashboardEntries} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        tableFooterData={tableFooterData}
        loading={loading}
        dashboardEntries={dashboardEntries}
      />
      <div className={`flex w-full justify-end mt-2 items-center ${dashboardEntries?.length <= pageSize && "hidden"}`}>
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(dashboardEntries?.length / pageSize)} // Correctly calculate the number of pages
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

export default DashboardPage;
