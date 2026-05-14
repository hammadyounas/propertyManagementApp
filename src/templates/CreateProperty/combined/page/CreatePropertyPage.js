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
import { Icon } from "@iconify/react/dist/iconify.js";
import { AppRoutes } from "@/constants/appRoutes";

const CreatePropertyPage = () => {
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
    inputType,
    setInputType,
    handleRemoveCSV,
    csvData,
    getInputProps,
    getRootProps,
    acceptedFiles,
  } = useForm();
  return (
    <FormUI handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <div>
        <div className="flex gap-4 mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="manual"
              checked={inputType === "manual"}
              onChange={() => setInputType("manual")}
              className="mr-2 "
            />
            Manually
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="csv"
              checked={inputType === "csv"}
              onChange={() => setInputType("csv")}
              className="mr-2 "
            />
            Upload CSV File
          </label>
        </div>

        {inputType === "manual" ? (
          <div>
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
            <PricingAndSize
              register={register}
              errors={errors}
              loading={loading}
            />
            <Amenities
              contract_type={contract_type}
              handleSelectContractType={handleSelectContractType}
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
              ownersDetailstatus={ownersDetailstatus}
              ownerDetailsStatus={ownerDetailsStatus}
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
          </div>
        ) : (
          <div className="mt-6">
            <label className="block text-sm font-medium my-2">
              Upload CSV*
            </label>

            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
              {csvData && csvData.length > 0 ? (
                <div className="relative flex items-center flex-col">
                  <div className="flex items-center mt-2">
                    <p className="text-sm text-gray-700">
                      {acceptedFiles[0]?.name}
                    </p>
                    {/* Remove Button */}
                    <button
                      type="button"
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition mx-2"
                      onClick={handleRemoveCSV}
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div {...getRootProps()} className="">
                  <input {...getInputProps()} disabled={loading} />
                  <span className="text-gray-500 flex items-center gap-2">
                    <Icon
                      icon={"material-symbols:upload"}
                      className="text-2xl"
                    />{" "}
                    Upload CSV
                  </span>
                  <p className="text-xs mt-1">Drag & Drop or Click to Upload</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
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
      <div className="flex justify-center md:justify-end mt-12 z-[9999]">
        <Button
          text={"Discard"}
          className={
            "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
          }
          onClick={() => push(AppRoutes.PROPERTIES)}
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

export default CreatePropertyPage;
