import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useDashboard from "../../functionality/page/useDashboard";
import { tableFooterData } from "../../functionality/constants/data";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";

const DashboardPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    dashboardEntries,
    loading,
    statusFilter,
    setStatusFilter,
    setSelectedFilter,
    selectedFilter,
    totalEntries,
  } = useDashboard();

  return (
    <>
      <Table
        rows={dashboardEntries} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        tableFooterData={tableFooterData}
        loading={loading}
        dashboardEntries={dashboardEntries}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        totalEntries={totalEntries}
      />
      <div
        className={`flex w-full justify-center mt-2 items-center ${
          totalEntries?.length <= pageSize && "hidden"
        }`}
      >
        <PaginationUI
          pageCount={Math.ceil(totalEntries / pageSize)}
          onPageChange={({ selected }) => handlePageChange(selected)}
          initialPage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default DashboardPage;
