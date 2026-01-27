import Table from "../organisms/TableUIContainer";
import useDashboard from "../../functionality/page/useDashboard";
import { tableFooterData } from "../../functionality/constants/data";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";
import ModalUI from "../../../../components/ui/organisms/ModalUI";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";

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
    // Delete props
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    currentItem,
    deleteLoading,
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
        onDelete={openDeleteModal}
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

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => handleDelete({ entryId: currentItem })}
        text="Are you sure you want to delete this dashboard entry?"
        disabled={deleteLoading}
        confirmText="Delete"
        cancelText="Cancel"
        title="Delete Dashboard Entry"
        iconColor="text-red-600"
        buttonColor="bg-red-600 hover:bg-red-700"
      />
    </>
  );
};

export default DashboardPage;
