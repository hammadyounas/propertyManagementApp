import PropertyDetailsPage from "../../../../templates/PropertyDetails/combined/page/PropertyDetailsPage";
import withAuth from "../../components/ui/organisms/withAuth";

const PropertyDetails = () => {
  return <PropertyDetailsPage />;
};

export default withAuth(PropertyDetails);
