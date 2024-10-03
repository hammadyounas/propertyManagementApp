import UserCardUI from "../../ui/atoms/UserCardUI";

const UserCard = ({ label, username, phone, email }) => {
  return (
    <UserCardUI label={label} username={username} phone={phone} email={email} />
  );
};

export default UserCard;
