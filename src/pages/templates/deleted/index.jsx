import withAuth from "../../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";

const DeletedTemplatesPage = dynamic(
  () => import("../../../templates/TemplateList/combined/pages/DeletedTemplatesPage"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  }
);

const DeletedTemplates = () => {
  return <DeletedTemplatesPage />;
};

export default withAuth(DeletedTemplates);
