import Card from "../../../../components/combined/molecules/CardUIContainer";

const PropertyDetailsUI = ({ children }) => {
  return (
    <div className="w-full ">
      <Card noborder>{children}</Card>
    </div>
  );
};

export default PropertyDetailsUI;
