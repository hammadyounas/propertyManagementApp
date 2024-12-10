import Modal from "../../../../components/combined/organisms/ModalUIContainer";
import Button from "../../../../components/ui/molecules/Button";
import useProperty from "../../functionality/page/useProperty";
import Table from "../organisms/TableUIContainer";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";

const PropertiesListingPage = () => {
  const {
    globalFilter,
    setGlobalFilter,
    paginatedProperties, // Use paginated properties here
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
  } = useProperty();

  return (
    <>
      <Table
        rows={paginatedProperties} // Pass paginated properties to the Table
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        openModal={openModal}
        push={push}
        handleDelete={handleDelete}
        loading={loading}
      />
      <div className="flex w-full justify-end mt-2 items-center">
        <ReactPaginate
          previousLabel={<Icon icon="heroicons-outline:chevron-left" />}
          nextLabel={<Icon icon="heroicons-outline:chevron-right" />}
          breakLabel={"..."}
          pageCount={Math.ceil(properties.length / pageSize)} // Correctly calculate the number of pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
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
    </>
  );
};

export default PropertiesListingPage;
