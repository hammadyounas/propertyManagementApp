import withAuth from "../../../../components/ui/organisms/withAuth";
import EditSalesTeamPage from "../../../../templates/SalesTeamListing/combined/page/EditSalesTeamPage";

const EditSalesTeam = () => {
  return <EditSalesTeamPage />;
};

export default withAuth(EditSalesTeam);
