import Select from "../../../../components/combined/molecules/SelectUIContainer";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import Textinput from "../../../../components/ui/atoms/TextInput";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
const GeneralInformationUI = ({
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
    <div>
      <h6>General Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="title"
              label="Property Title*"
              type="text"
              register={register}
              error={errors.title}
              placeholder="Property Title"
              disabled={loading}
            />
          </div>
          <div className="mt-[6px] w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Furnishing Status*</div>
            <ReactSelect
              name="furnishing_status"
              value={furnishing}
              onChange={handleSelectFurnishingStatus}
              options={furnishingStatus}
              placeholder="Furnishing Status"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.furnishing_status && !furnishing && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.furnishing_status?.message}
              </p>
            )}
          </div>
          {/* <div className="w-full md:w-[49%] mt-2">
            <Textarea
              name="description"
              label="Description*"
              type="text"
              register={register}
              error={errors.description}
              placeholder="Description"
              row={5}
              disabled={loading}
            />
          </div> */}
        </div>
        {/* <div className="mt-2"></div> */}
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Property Type*</div>
            <ReactSelect
              name="type"
              value={type}
              onChange={handleSelectType}
              options={propertyTypes}
              placeholder="Property Type"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.type && !type && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.type?.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Property Status*</div>
            <ReactSelect
              name="status"
              value={status}
              onChange={handleSelectStatus}
              options={propertyStatus}
              placeholder="Property Status"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.status && !status && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.status?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Ownership Status*</div>
            <ReactSelect
              name="ownership_status"
              value={ownership}
              onChange={handleSelectOwnershipStatus}
              options={ownershipStatus}
              placeholder="Ownership Status"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.ownership_status && !ownership && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.ownership_status?.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[49%] mt-1">
            <Textarea
              name="description"
              label="Property Description*"
              type="text"
              register={register}
              error={errors.description}
              placeholder="Property Description"
              row={5}
              disabled={loading}
            />
          </div>
          {/* <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Furnishing Status*</div>
            <ReactSelect
              name="furnishing_status"
              value={furnishing}
              onChange={handleSelectFurnishingStatus}
              options={furnishingStatus}
              placeholder="Furnishing Status*"
              isDisabled={loading}
            />
            {errors?.furnishing_status && !furnishing && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.furnishing_status?.message}
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationUI;
