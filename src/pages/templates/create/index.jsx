import withAuth from "../../../components/ui/organisms/withAuth";
import CreateTextEditorPage from "../../../templates/CreateTemplate/combined/pages/CreateTextEditorPage";

const CreateTemplatesPage = () => {
  return <CreateTextEditorPage />;
};

export default withAuth(CreateTemplatesPage);