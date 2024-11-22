import withAuth from "../../../../components/ui/organisms/withAuth";
import PropertyDetailsPage from "../../../../templates/PropertyDetails/combined/page/PropertyDetailsPage";

const PropertyDetails = () => {
  return <PropertyDetailsPage />;
};

export default withAuth(PropertyDetails);
