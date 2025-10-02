import withAuth from "../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";

const DocumentListing = dynamic(() => import("../../templates/Documents/combined/pages/DocumentListing"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading...</div>
});

const DesignDocuments = () => {
  return <DocumentListing />
}

export default withAuth(DesignDocuments);