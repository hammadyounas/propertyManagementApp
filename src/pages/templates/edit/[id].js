import withAuth from "../../../components/ui/organisms/withAuth";
import CreateTextEditorPage from "../../../templates/CreateTemplate/combined/pages/CreateTextEditorPage";
import { useRouter } from "next/router";

const EditTemplatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <CreateTextEditorPage templateId={id} />;
};

export default withAuth(EditTemplatePage);
