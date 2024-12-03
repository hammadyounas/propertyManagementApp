import withAuth from "../../components/ui/organisms/withAuth";
import ProfilePage from "../../templates/Profile/combined/page/ProfilePage";

const Profile = () => {
  return <ProfilePage />;
};

export default withAuth(Profile);
