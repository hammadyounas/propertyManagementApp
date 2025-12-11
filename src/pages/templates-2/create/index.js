import withAuth from "../../../components/ui/organisms/withAuth";
import CreateTemplates2Page from "../../../templates/Templates2/combined/pages/CreateTemplates2Page";

const CreateTemplates2PageWrapper = () => {
  return <CreateTemplates2Page />;
};

export default withAuth(CreateTemplates2PageWrapper);

