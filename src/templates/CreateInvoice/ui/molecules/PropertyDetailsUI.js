import Textinput from "@/components/ui/atoms/TextInput";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";

const PropertyDetailsUI = ({
  register,
  errors,
  loading,
  selectedProperty,
  handleSelectProperty,
  properties,
}) => {
  return (
    <div className="mt-8">
      <h6>Property Details</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="mt-2 w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Property Name*</div>
            <ReactSelect
              name="property_id"
              value={selectedProperty}
              onChange={handleSelectProperty}
              options={properties}
              placeholder="Property Name"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.property_id && !selectedProperty && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.property_id?.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="property_address"
              label="Property Address"
              type="text"
              register={register}
              error={errors.property_address}
              placeholder="Selected Property Address"
              disabled={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="property_type"
              label="Property Type"
              type="text"
              register={register}
              error={errors.property_type}
              placeholder="Selected Property Type"
              disabled={true}
            />
          </div>
          <div className="w-full md:w-[49%] mt-2">
            <Textarea
              name="property_description"
              label="Property Description"
              type="text"
              register={register}
              error={errors.property_description}
              placeholder="Selected Property Description"
              row={5}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsUI;
