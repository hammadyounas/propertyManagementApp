import Textinput from "@/components/ui/atoms/TextInput";

const LocationUI = ({ register, errors, loading }) => {
  return (
    <div className="mt-8">
      <h6>Location</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="address"
              label="Address*"
              type="text"
              register={register}
              error={errors.address}
              placeholder="Address"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="city"
              label="City*"
              type="text"
              register={register}
              error={errors.city}
              placeholder="City"
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="area"
              label="Area*"
              type="text"
              register={register}
              error={errors.area}
              placeholder="Area"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="neighborhood"
              label="Neighborhood*"
              type="text"
              register={register}
              error={errors.neighborhood}
              placeholder="Neighborhood"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationUI;
