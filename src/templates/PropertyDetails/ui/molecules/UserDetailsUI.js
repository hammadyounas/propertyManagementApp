import UserCard from "../../combined/atoms/UserCardUIContainer";

const UserDetailsUI = ({ client, assignedTo }) => {
  return (
    <div className="w-full lg:w-[24%]">
      {/* <UserCard
        label="Client"
        username={client?.name}
        phone={client?.phone}
        email={client?.email}
      /> */}
      <div className="my-4">
        <UserCard
          label="Salesperson"
          username={assignedTo?.name}
          phone={assignedTo?.phone}
          email={assignedTo?.email}
        />
      </div>
    </div>
  );
};

export default UserDetailsUI;
