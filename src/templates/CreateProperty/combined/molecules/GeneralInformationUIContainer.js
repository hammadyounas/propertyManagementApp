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
    />
  );
};

export default GeneralInformation;
