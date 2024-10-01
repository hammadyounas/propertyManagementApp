import Textinput from "@/components/ui/atoms/TextInput";

const LocationUI = ({ register }) => {
  return (
    <div className="mt-8">
      <h6>Location</h6>
      <div className="my-4">
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Textinput
              name="address"
              label="Address"
              type="text"
              register={register}
              //   error={errors.email}
              placeholder="Address"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
          <div className="w-6/12">
            <Textinput
              name="city"
              label="City"
              type="text"
              register={register}
              //   error={errors.email}
              placeholder="City"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Textinput
              name="area"
              label="Area"
              type="text"
              register={register}
              //   error={errors.email}
              placeholder="Area"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
          <div className="w-6/12">
            <Textinput
              name="neighborhood"
              label="Neighborhood"
              type="text"
              register={register}
              //   error={errors.email}
              placeholder="Neighborhood"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationUI;
