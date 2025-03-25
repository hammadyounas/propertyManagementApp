import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, push, loading, openDeleteModal, users,  setStatusFilter,
  statusFilter,
  setSelectedFilter,
  selectedFilter,
 }) => {
  const { columns } = useTable();
  return (
    <TableUI
      rows={rows}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      push={push}
      loading={loading}
      openDeleteModal={openDeleteModal}
      users={users}
      setStatusFilter={setStatusFilter}  // ✅ Make sure this is passed
      statusFilter={statusFilter}
      setSelectedFilter={setSelectedFilter}
      selectedFilter={selectedFilter}
    />
  );
};

export default Table;
