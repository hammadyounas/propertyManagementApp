import useTable from "../../functionality/organisms/useTable";
import TableUI from "../../ui/organisms/TableUI";

const Table = ({ rows, globalFilter, setGlobalFilter, push, loading, invoices, setInvoices, downloadPDF, selectedInvoice,
  setSelectedInvoice, selectedLanguage }) => {
  const { columns } = useTable();
  return (
    <TableUI
      rows={rows}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      push={push}
      loading={loading}
      invoices={invoices}
      setInvoices={setInvoices}
      downloadPDF={downloadPDF}
      selectedInvoice={selectedInvoice}
      setSelectedInvoice={setSelectedInvoice}
      selectedLanguage={selectedLanguage}
    />
  );
};

export default Table;
