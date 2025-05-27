import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import useAcm from "../../functionality/page/useAcm";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";

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
    </>
  );
};

export default ACMListingPage;
