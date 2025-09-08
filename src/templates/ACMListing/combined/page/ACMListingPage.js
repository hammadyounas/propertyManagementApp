import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useAcm from "../../functionality/page/useAcm";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";

const ACMListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    acms,
    paginatedAcms, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    totalCount,
    loading,
    deleteACMById,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
  } = useAcm();

  return (
    <>
      <Table
        rows={paginatedAcms} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        acms={acms}
        totalCount={totalCount}
        loading={loading}
        openDeleteModal={openDeleteModal}
      />
      <div
           className={`flex w-full justify-end mt-2 items-center ${
             totalCount <= pageSize && "hidden"
           }`}
         >
           <PaginationUI
             pageCount={Math.ceil(totalCount / pageSize)}
             onPageChange={({ selected }) => handlePageChange(selected)}
             initialPage={currentPage - 1}
           />
         </div>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={deleteACMById}
        text={"Are you sure you want to delete this ACM?"}
        disabled={deleteLoading}
      />
    </>
  );
};

export default ACMListingPage;
