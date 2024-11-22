import SalesTeamListingPage from "../../templates/SalesTeamListing/combined/page/SalesTeamListingPage";
import withAuth from "../../components/ui/organisms/withAuth";

const SalesTeam = () => {
  return <SalesTeamListingPage />;
};

export default withAuth(SalesTeam);
