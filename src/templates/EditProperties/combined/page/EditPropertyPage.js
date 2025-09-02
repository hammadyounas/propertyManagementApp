import Button from "../../../../components/ui/atoms/Button";
import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";
import Amenities from "../molecules/AmenitiesUIContainer";
import GeneralInformation from "../molecules/GeneralInformationUIContainer";
import ImagesAndDocuments from "../molecules/ImagesAndDocumentsUIContainer";
import Location from "../molecules/LocationUIContainer";
import PricingAndSize from "../molecules/PricingAndSizeUIContainer";
import OwnerDetails from "../molecules/OwnersDetailsUIContainer";
import SalesInformation from "../molecules/SalesInformationUIContainer";
import { formSections } from "../../../CreateProperty/functionality/constants/form_data";
import { FormSection } from "../../../CreateProperty/ui/organisms/FormSections";

const EditPropertyPage = () => {
  const {
    register,
    control,
    propertyTypes,
    propertyStatus,
    ownershipStatus,
    furnishingStatus,
    contract_type,
    handleSelectContractType,
    availableFacilities,
    salesPerson,
    clients,
    selectedImages,
    selectedDocs,
    handleImagesChange,
    handleDocsChange,
    handleFileRemove,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    push,
    getValues,
    type,
    status,
    ownership,
    furnishing,
    selectedClient,
    handleSelectType,
    handleSelectStatus,
    handleSelectOwnershipStatus,
    handleSelectFurnishingStatus,
    handleSelectClient,
    imageInputRef,
    docInputRef,
    triggerImageFileInput,
    triggerDocFileInput,
    renderPreview,
    selectedSalespersons,
    handleSelectSalesperson,
    ownersDetailstatus,
    handleSelectOwnersDetailsStatus,
    ownerDetailsStatus,
    ownerDetails,
    getDataLoading,
    // Add missing variables for FormSection approach
    formData,
    expandedSections,
    toggleSection,
    handleInputChange,
    getNestedValue,
    getSectionErrors,
  } = useForm();
  return (
    <FormUI handleSubmit={handleSubmit} onSubmit={onSubmit} getDataLoading={getDataLoading}>
      <div>
        {formSections.map((section, index) => (
          <FormSection
            key={index}
            section={section}
            index={index}
            isExpanded={expandedSections[index]}
            onToggle={toggleSection}
            errors={errors}
            formData={formData}
            onInputChange={handleInputChange}
            getNestedValue={getNestedValue}
            getSectionErrors={getSectionErrors}
          />
        ))}
      </div>
      
      <div className="flex justify-center md:justify-end mt-12 z-[9999]">
        <Button
          text={"Discard"}
          className={
            "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
          }
          onClick={() => push("/properties")}
          loading={loading}
        />
        <Button
          text={"Update Property"}
          className={"md:!w-36"}
          type="submit"
          loading={loading}
        />
      </div>
    </FormUI>
  );
};

export default EditPropertyPage;
