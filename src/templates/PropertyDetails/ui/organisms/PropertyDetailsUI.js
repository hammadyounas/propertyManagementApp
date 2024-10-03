import Card from "../../../../components/combined/molecules/CardUIContainer";

const PropertyDetailsUI = ({ children }) => {
  return (
    <div className="w-full lg:w-[74%]">
      <Card noborder>{children}</Card>
    </div>
  );
};

export default PropertyDetailsUI;
