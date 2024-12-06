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
              name="street_number"
              label="Street Number*"
              type="text"
              register={register}
              error={errors.street_number}
              placeholder="Street Number"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="street_name"
              label="Steet Name*"
              type="text"
              register={register}
              error={errors.street_name}
              placeholder="Street Name"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="cadstre_number"
              label="Cadstre Number*"
              type="text"
              register={register}
              error={errors.cadstre_number}
              placeholder="Cadstre Number"
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
          <div className="w-full md:w-[49%]">
            <Textinput
              name="location_map_url"
              label="Location Map Url*"
              type="text"
              register={register}
              error={errors.location_map_url}
              placeholder="Location Map Url"
              disabled={loading}
            />
          </div>
        </div>
        {/* <div className="flex flex-wrap justify-between">
        </div> */}
      </div>
    </div>
  );
};

export default LocationUI;
