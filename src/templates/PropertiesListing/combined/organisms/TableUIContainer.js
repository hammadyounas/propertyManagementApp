import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, openModal, push, handleDelete, loading }) => {
  const { columns } = useTable();
  return (
    <TableUI
      rows={rows}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      openModal={openModal}
      push={push}
      handleDelete={handleDelete}
      loading={loading}
    />
  );
};

export default Table;
