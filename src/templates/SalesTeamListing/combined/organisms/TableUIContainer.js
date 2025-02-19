import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, push, loading, openDeleteModal, users }) => {
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
    />
  );
};

export default Table;
