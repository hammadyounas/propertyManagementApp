import Select from "../../../../components/combined/molecules/SelectUIContainer";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import Textinput from "../../../../components/ui/atoms/TextInput";
import { Controller } from "react-hook-form";
const GeneralInformationUI = ({
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
    <div>
      <h6>General Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="title"
              label="Title*"
              type="text"
              register={register}
              error={errors.title}
              placeholder="Title"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%] mt-2">
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
          </div>
        </div>
        {/* <div className="mt-2"></div> */}
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Type*"}
                  options={propertyTypes}
                  isSearchable
                  placeholder="Type"
                  register={register}
                  disabled={loading}
                  error={errors.type}
                />
              )}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Status*"}
                  options={propertyStatus}
                  isSearchable
                  placeholder="Status"
                  register={register}
                  disabled={loading}
                  error={errors.status}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Controller
              name="ownership_status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Ownership Status*"}
                  options={ownershipStatus}
                  isSearchable
                  placeholder="Ownership Status"
                  register={register}
                  disabled={loading}
                  error={errors.ownership_status}
                />
              )}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Controller
              name="furnishing_status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Furnishing Status*"}
                  options={furnishingStatus}
                  isSearchable
                  placeholder="Furnishing Status"
                  register={register}
                  disabled={loading}
                  error={errors.furnishing_status}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationUI;
