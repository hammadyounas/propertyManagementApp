import withAuth from "../../components/ui/organisms/withAuth";
import CreateTextEditorPage from "../../templates/CreateTemplate/combined/pages/CreateTextEditorPage"

const TemplatesPage = () => {
  return <CreateTextEditorPage />;
};

export default withAuth(TemplatesPage);