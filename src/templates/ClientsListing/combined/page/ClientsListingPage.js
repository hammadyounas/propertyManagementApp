import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useClients from "../../functionality/page/useClients";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";

const ClientsListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    paginatedUsers, // Use paginated properties here
    pageSize,
    handlePageChange,
    currentPage,
    push,
    users,
    deleteClientById,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    loading
  } = useClients();

  return (
    <>
      <Table
        rows={paginatedUsers} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        openDeleteModal={openDeleteModal}
        loading={loading}
        users={users}
      />
      <div className={`flex w-full justify-end mt-2 items-center ${users?.length <= pageSize && "hidden"}`}>
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(users?.length / pageSize)} // Correctly calculate the number of pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          initialPage={currentPage - 1}
        />
      </div>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={deleteClientById}
        text={"Are you sure you want to delete this client?"}
        disabled={deleteLoading}
      />
    </>
  );
};

export default ClientsListingPage;
