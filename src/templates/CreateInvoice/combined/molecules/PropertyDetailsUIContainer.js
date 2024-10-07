import PropertyDetailsUI from "../../ui/molecules/PropertyDetailsUI";

const PropertyDetails = ({
  register,
  errors,
  loading,
  selectedProperty,
  handleSelectProperty,
  properties,
}) => {
  return (
    <PropertyDetailsUI
      register={register}
      errors={errors}
      loading={loading}
      selectedProperty={selectedProperty}
      handleSelectProperty={handleSelectProperty}
      properties={properties}
    />
  );
};

export default PropertyDetails;
