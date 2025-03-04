import useTable from "../../functionality/organisms/useTable";
import DashboardTableUI from "../../ui/organisms/DashboardTableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, push, tableFooterData }) => {
  const { columns } = useTable();
  return (
    <DashboardTableUI
      rows={rows}
      columns={columns}
      tableFooterData = {tableFooterData}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      push={push}
    />
  );
};

export default Table;
