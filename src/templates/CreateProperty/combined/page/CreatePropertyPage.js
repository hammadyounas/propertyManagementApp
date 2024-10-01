import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";
import Amenities from "../molecules/AmenitiesUIContainer";
import GeneralInformation from "../molecules/GeneralInformationUIContainer";
import Location from "../molecules/LocationUIContainer";
import PricingAndSize from "../molecules/PricingAndSizeUIContainer";
import SalesInformation from "../molecules/SalesInformationUIContainer";

const CreatePropertyPage = () => {
  const {
    register,
    control,
    propertyTypes,
    propertyStatus,
    ownershipStatus,
    furnishingStatus,
    amenities,
    handleSelectAmenities,
    availableFacilities,
    salesPerson,
    clients,
  } = useForm();
  return (
    <FormUI>
      <GeneralInformation
        register={register}
        control={control}
        propertyTypes={propertyTypes}
        propertyStatus={propertyStatus}
        ownershipStatus={ownershipStatus}
        furnishingStatus={furnishingStatus}
      />
      <Location register={register} />
      <PricingAndSize register={register} />
      <Amenities
        amenities={amenities}
        handleSelectAmenities={handleSelectAmenities}
        availableFacilities={availableFacilities}
      />
      <SalesInformation
        register={register}
        control={control}
        salesPerson={salesPerson}
        clients={clients}
      />
    </FormUI>
  );
};

export default CreatePropertyPage;
