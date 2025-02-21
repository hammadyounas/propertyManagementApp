import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useMarketingEmails from "../../functionality/page/useMarketingEmails";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";

const MarketingEmailsListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    emails,
    setEmails,
    paginatedEmails,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    deleteEmail,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
  } = useMarketingEmails();

  return (
    <>
      <Table
        rows={paginatedEmails}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        openDeleteModal={openDeleteModal}
        loading={loading}
        emails={emails}
      />
      <div
        className={`flex w-full justify-end mt-2 items-center ${
          emails?.length <= pageSize && "hidden"
        }`}
      >
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(emails.length / pageSize)}
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
        onDelete={deleteEmail}
        text={"Are you sure you want to delete this email?"}
        disabled={deleteLoading}
      />
    </>
  );
};

export default MarketingEmailsListingPage;
