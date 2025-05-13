import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, openModal, push, openDeleteModal, loading, properties, totalCount,   setStatusFilter,
  statusFilter, }) => {
  const { columns } = useTable();
  return (
    <TableUI
      rows={rows}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      openModal={openModal}
      push={push}
      openDeleteModal={openDeleteModal}
      loading={loading}
      properties={properties}
      totalCount={totalCount}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
    />
  );
};

export default Table;
