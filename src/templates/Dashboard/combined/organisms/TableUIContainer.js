  import useTable from "../../functionality/organisms/useTable";
  import DashboardTableUI from "../../ui/organisms/DashboardTableUI";

  const Table = ({ rows, globalFilter, setGlobalFilter, push, tableFooterData, loading, dashboardEntries, paginatedDashboardEntries }) => {
    const { columns } = useTable();
    return (
      <DashboardTableUI
        rows={rows}
        columns={columns}
        tableFooterData={tableFooterData}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        push={push}
        loading={loading}
        dashboardEntries={dashboardEntries}
        paginatedDashboardEntries={paginatedDashboardEntries}
      />
    );
  };

  export default Table;
