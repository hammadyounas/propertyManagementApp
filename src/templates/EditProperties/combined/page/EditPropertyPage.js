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

const EditPropertyPage = () => {
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
  } = useForm();
  return (
    <FormUI handleSubmit={handleSubmit} onSubmit={onSubmit} getDataLoading={getDataLoading}>
      <GeneralInformation
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
      <Location register={register} errors={errors} loading={loading} />
      <PricingAndSize register={register} errors={errors} loading={loading} />
      <Amenities
        amenities={amenities}
        handleSelectAmenities={handleSelectAmenities}
        selectedSalespersons={selectedSalespersons}
        handleSelectSalesperson={handleSelectSalesperson}
        salesPerson={salesPerson}
        availableFacilities={availableFacilities}
        errors={errors}
        loading={loading}
      />
      <OwnerDetails 
      register={register}
      errors={errors}
      loading={loading}
      handleSelectOwnersDetailsStatus={handleSelectOwnersDetailsStatus}
      // ownersDetailstatus={ownersDetailstatus}
      ownerDetailsStatus={ownerDetailsStatus}
      ownerDetails={ownerDetails}
      />
      
      <ImagesAndDocuments
        selectedImages={selectedImages}
        selectedDocs={selectedDocs}
        handleImagesChange={handleImagesChange}
        handleDocsChange={handleDocsChange}
        handleFileRemove={handleFileRemove}
        errors={errors}
        loading={loading}
        imageInputRef={imageInputRef}
        docInputRef={docInputRef}
        triggerImageFileInput={triggerImageFileInput}
        triggerDocFileInput={triggerDocFileInput}
        renderPreview={renderPreview}
      />
      {/* <SalesInformation
        register={register}
        control={control}
        salesPerson={salesPerson}
        clients={clients}
        errors={errors}
        loading={loading}
        getValues={getValues}
        selectedSalesperson={selectedSalesperson}
        selectedClient={selectedClient}
        handleSelectSalesperson={handleSelectSalesperson}
        handleSelectClient={handleSelectClient}
      /> */}
      <div className="flex justify-center md:justify-end mt-12">
        <Button
          text={"Discard"}
          className={
            "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
          }
          onClick={() => push("/properties")}
          loading={loading}
        />
        <Button
          text={"Submit"}
          className={"md:!w-36"}
          type="submit"
          loading={loading}
        />
      </div>
    </FormUI>
  );
};

export default EditPropertyPage;
