import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, push, acms, totalCount, loading, openDeleteModal, handleGeneratePDF, downloadingPDF, openImageModal }) => {
  const { columns } = useTable();
  return (
    <TableUI
      rows={rows}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      push={push}
      acms={acms}
      totalCount={totalCount}
      loading={loading}
      openDeleteModal={openDeleteModal}
      handleGeneratePDF={handleGeneratePDF}
      downloadingPDF={downloadingPDF}
      openImageModal={openImageModal}
    />
  );
};

export default Table;
