import withAuth from "../../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";

const DeletedDocumentsPage = dynamic(
  () => import("../../../templates/Documents/combined/pages/DeletedDocumentsPage"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  }
);

const DeletedDocuments = () => {
  return <DeletedDocumentsPage />;
};

export default withAuth(DeletedDocuments);
