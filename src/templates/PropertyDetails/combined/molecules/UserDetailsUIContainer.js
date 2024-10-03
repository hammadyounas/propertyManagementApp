import UserDetailsUI from "../../ui/molecules/UserDetailsUI";

const UserDetails = ({ client, assignedTo }) => {
  return <UserDetailsUI client={client} assignedTo={assignedTo} />;
};

export default UserDetails;
