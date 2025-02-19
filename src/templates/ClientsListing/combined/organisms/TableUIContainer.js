import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, push, openDeleteModal, loading, users }) => {
  const { columns } = useTable();
  return (
    <TableUI
      rows={rows}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      push={push}
      openDeleteModal={openDeleteModal}
      loading={loading}
      users={users}
    />
  );
};

export default Table;
