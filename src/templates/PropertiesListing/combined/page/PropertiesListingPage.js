import Modal from "../../../../components/combined/organisms/ModalUIContainer";
import Button from "../../../../components/ui/molecules/Button";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";
import PaginationUI from "../../../../components/ui/molecules/PaginationUI";
import useProperty from "../../functionality/page/useProperty";
import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";

const PropertiesListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    // paginatedProperties, // Use paginated properties here
    pageSize,
    handlePageChange,
    currentPage,
    properties,
    activeModal,
    closeModal,
    openModal,
    push,
    handleDelete,
    loading,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    totalCount,
      setStatusFilter,
  statusFilter,
  } = useProperty();

  return (
    <>
      <Table
        rows={properties} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        openModal={openModal}
        push={push}
        openDeleteModal={openDeleteModal}
        loading={loading}
        properties={properties}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
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
      <Modal
        title="Filters"
        label="Filters"
        labelClass="btn-outline-dark"
        // uncontrol
        activeModal={activeModal}
        onClose={closeModal}
        centered
        footerContent={
          <Button
            text="Apply"
            className="btn-primary bg-primary-default"
            onClick={closeModal}
          />
        }
      >
        <h4 className="font-medium text-lg mb-3 text-slate-900">
          Filters will come here i.e
        </h4>
        <div className="text-base text-slate-600 dark:text-slate-300">
          Price Range (Range Slider)
          <br />
          Property Type (Dropdown)
          <br />
          Size (Range Slider)
          <br />
          No of Bedrooms (Dropdown)
          <br />
          No of Bathrooms (Dropdown)
          <br />
          Property Status (Dropdown)
          <br />
          Assigned Salesperson (Dropdown)
        </div>
      </Modal>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        text={"Are you sure you want to delete this property?"}
        disabled={deleteLoading}
      />
    </>
  );
};

export default PropertiesListingPage;
