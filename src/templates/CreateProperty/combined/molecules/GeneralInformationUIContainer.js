import GeneralInformationUI from "../../ui/molecules/GeneralInformationUI";

const GeneralInformation = ({
  register,
  control,
  propertyTypes,
  propertyStatus,
  ownershipStatus,
  furnishingStatus,
  errors,
  loading,
  type,
  status,
  ownership,
  furnishing,
  handleSelectType,
  handleSelectStatus,
  handleSelectOwnershipStatus,
  handleSelectFurnishingStatus,
}) => {
  return (
    <GeneralInformationUI
      register={register}
      control={control}
      propertyTypes={propertyTypes}
      propertyStatus={propertyStatus}
      ownershipStatus={ownershipStatus}
      furnishingStatus={furnishingStatus}
      errors={errors}
      loading={loading}
      type={type}
      status={status}
      ownership={ownership}
      furnishing={furnishing}
      handleSelectType={handleSelectType}
      handleSelectStatus={handleSelectStatus}
      handleSelectOwnershipStatus={handleSelectOwnershipStatus}
      handleSelectFurnishingStatus={handleSelectFurnishingStatus}
    />
  );
};

export default GeneralInformation;
