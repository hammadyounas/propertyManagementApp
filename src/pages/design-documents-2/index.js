import withAuth from "../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";

const DocumentListing2 = dynamic(
  () => import("../../templates/Documents2/combined/pages/DocumentListing2"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  }
);

const DesignDocuments2Page = () => {
  return <DocumentListing2 />;
};

export default withAuth(DesignDocuments2Page);
