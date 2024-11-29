import useSalespersonTable from "../../functionality/organisms/useSalespersonTable";
import SalespersonUI from "../../ui/molecules/SalespersonUI";

const Salesperson = ({ salesperosonDataRows }) => {
    const {salespersonColumns} = useSalespersonTable();
  return <SalespersonUI salespersonColumns={salespersonColumns} salesperosonDataRows={salesperosonDataRows} />;
};

export default Salesperson;