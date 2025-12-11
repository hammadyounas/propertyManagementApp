import withAuth from "../../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";

const DesignDocument2Page = dynamic(
  () => import("../../../templates/Documents2/combined/pages/DesignDocument2Page"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  }
);

const DesignDocuments2Create = () => {
  return <DesignDocument2Page />;
};

export default withAuth(DesignDocuments2Create);


