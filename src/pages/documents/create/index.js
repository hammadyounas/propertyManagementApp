import withAuth from "../../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";

const DesignDocumentPage = dynamic(() => import("../../../templates/Documents/combined/pages/DesignDocumentPage"), { ssr: false });

const DesignDocuments = () => {
  return <DesignDocumentPage />
}

export default withAuth(DesignDocuments);