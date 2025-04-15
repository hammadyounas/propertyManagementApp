import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useDashboard from "../../functionality/page/useDashboard";
import { tableFooterData } from "../../functionality/constants/data";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";
import ModalUI from "../../../../components/ui/organisms/ModalUI";

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
    handleOpenCommentModal,
    handleCloseModal,
    selectedComment,
    isModalOpen,
    brokerOptions,
    setBrokerOptions,
    selectedBroker,
    setSelectedBroker,
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
        handleOpenCommentModal={handleOpenCommentModal}
        brokerOptions={brokerOptions}
        setBrokerOptions={setBrokerOptions}
        selectedBroker={selectedBroker}
        setSelectedBroker={setSelectedBroker}
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

      <div className="flex justify-center items-center">
        <ModalUI
          activeModal={isModalOpen}
          onClose={handleCloseModal}
          title="Comment"
          mainClass="items-center break-all whitespace-pre-wrap"
        >
          <div className="text-center">
            <p>{selectedComment}</p>
          </div>
        </ModalUI>
      </div>
    </>
  );
};

export default DashboardPage;
