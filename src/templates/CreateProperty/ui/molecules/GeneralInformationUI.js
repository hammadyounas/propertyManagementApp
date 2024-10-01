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
}) => {
  return (
    <div>
      <h6>General Information</h6>
      <div className="my-4">
        <Textinput
          name="title"
          label="Title"
          type="text"
          register={register}
          //   error={errors.email}
          placeholder="Title"
          //   className="px-6"
          //   disabled={loading}
        />
        <div className="mt-2">
          <Textarea
            name="description"
            label="Description"
            register={register}
            placeholder="Description"
            row={5}
          />
        </div>
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Type"}
                  options={propertyTypes}
                  isSearchable
                  placeholder="Type"
                  register={register}
                  // disabled={loading}
                  // error={errors.manager}
                />
              )}
            />
          </div>
          <div className="w-6/12">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Status"}
                  options={propertyStatus}
                  isSearchable
                  placeholder="Status"
                  register={register}
                  // disabled={loading}
                  // error={errors.manager}
                />
              )}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Controller
              name="ownership_status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Ownership Status"}
                  options={ownershipStatus}
                  isSearchable
                  placeholder="Ownership Status"
                  register={register}
                  // disabled={loading}
                  // error={errors.manager}
                />
              )}
            />
          </div>
          <div className="w-6/12">
            <Controller
              name="furnishing_status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Furnishing Status"}
                  options={furnishingStatus}
                  isSearchable
                  placeholder="Furnishing Status"
                  register={register}
                  // disabled={loading}
                  // error={errors.manager}
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
