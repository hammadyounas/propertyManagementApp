import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Mail, Phone } from "lucide-react";
const UserCardUI = ({ label, username, phone, email }) => {
  return (
    <Card noborder>
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-lg self-start">{label} Details</h3>
        <img
          src={"/assets/images/users/user-1.jpg"}
          alt=""
          className="block w-20 h-20 object-cover rounded-full my-4"
        />
        <p className="font-bold">{username}</p>
        <p className="mb-2">({label})</p>
        <div className="flex items-center my-2">
          <Phone className="mr-2 text-primary-default" size={20} />
          <p>{phone}</p>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 text-primary-default" size={20} />
          <p>{email}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserCardUI;
