import withAuth from "../../components/ui/organisms/withAuth";
import TemplateListPage from "../../templates/TemplateList/combined/pages/TemplateListPage";

const TemplatesPage = () => {
  return <TemplateListPage />;
};

export default withAuth(TemplatesPage);