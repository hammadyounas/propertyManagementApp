import withAuth from "../../components/ui/organisms/withAuth";
import DocumentListing from "../../templates/Documents/combined/pages/DocumentListing";

const DesignDocuments = () => {
  return <DocumentListing />
}

export default withAuth(DesignDocuments);