import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useSalesTeam from "../../functionality/page/useSalesTeam";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";

const SalesTeamListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    paginatedUsers, // Use paginated properties here
    pageSize,
    handlePageChange,
    currentPage,
    push,
    users,
    loading,
    handleDelete,
    showDeleteModal,
    closeDeleteModal,
    openDeleteModal,
    deleteLoading,
    setStatusFilter,
    statusFilter,
    setSelectedFilter,
    selectedFilter,
  } = useSalesTeam();

  return (
    <>
      <Table
        rows={paginatedUsers} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        loading={loading}
        openDeleteModal={openDeleteModal}
        users={users}
        setStatusFilter={setStatusFilter} // ✅ Make sure this is passed
        statusFilter={statusFilter}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      <div
        className={`flex w-full justify-end mt-2 items-center ${
          users?.length <= pageSize && "hidden"
        }`}
      >
        <PaginationUI
          pageCount={Math.ceil(users.length / pageSize)}
          onPageChange={({ selected }) => handlePageChange(selected)}
          initialPage={currentPage - 1}
        />
      </div>
      
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        text={"Are you sure you want to delete this broker?"}
        disabled={deleteLoading}
      />
    </>
  );
};

export default SalesTeamListingPage;
