import useDocumentsTable from "../../functionality/organisms/useDocumentsTable";
import DocumentsUI from "../../ui/molecules/DocumentsUI";

const Documents = ({ documentDataRows }) => {
    const {documentColumns} = useDocumentsTable();
  return <DocumentsUI documentColumns={documentColumns} documentDataRows={documentDataRows} />;
};

export default Documents;