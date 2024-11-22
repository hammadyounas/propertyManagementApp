import withAuth from "../components/ui/organisms/withAuth";
import DashboardPage from "../templates/Dashboard/combined/page/DashboardPage";

const Dashboard = () => {
  return <DashboardPage />;
};

export default withAuth(Dashboard);
