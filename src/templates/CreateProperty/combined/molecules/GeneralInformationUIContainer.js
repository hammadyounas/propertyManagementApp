import GeneralInformationUI from "../../ui/molecules/GeneralInformationUI";

const GeneralInformation = ({
  register,
  control,
  propertyTypes,
  propertyStatus,
  ownershipStatus,
  furnishingStatus,
}) => {
  return (
    <GeneralInformationUI
      register={register}
      control={control}
      propertyTypes={propertyTypes}
      propertyStatus={propertyStatus}
      ownershipStatus={ownershipStatus}
      furnishingStatus={furnishingStatus}
    />
  );
};

export default GeneralInformation;
