import useProfile from "../../functional/organisms/useProfile";
import ProfileUI from "../../ui/organisms/ProfileUI";

const ProfileUIContainer = () => {
  const { ProfileLabel, ProfileMenu } = useProfile();
  return <ProfileUI ProfileLabel={ProfileLabel} ProfileMenu={ProfileMenu}/>;
};

export default ProfileUIContainer;
