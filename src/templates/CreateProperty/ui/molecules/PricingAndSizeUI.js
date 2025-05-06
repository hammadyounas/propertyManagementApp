import Textinput from "@/components/ui/atoms/TextInput";
const PricingAndSizeUI = ({ register, errors, loading }) => {
  return (
    <div className="mt-8">
      <h6>Pricing & Size</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="price"
              label="Price*"
              type="number"
              register={register}
              error={errors.price}
              placeholder="Price"
              disabled={loading}
            />
          </div>
          {/* <div className="w-full md:w-[49%]">
            <Textinput
              name="size"
              label="No of Units*"
              type="number"
              register={register}
              error={errors.size}
              placeholder="Size"
              disabled={loading}
            />
          </div> */}
            <div className="w-full md:w-[49%]">
            <Textinput
              name="unit_size"
              label="Unit Size*"
              type="number"
              register={register}
              error={errors.unit_size}
              placeholder="Unit Size"
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="no_of_garages"
              label="No of Garages*"
              type="number"
              register={register}
              error={errors.no_of_garages}
              placeholder="No of Garages"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="no_of_parking_places"
              label="No of Parking Places*"
              type="number"
              register={register}
              error={errors.no_of_parking_places}
              placeholder="No of Parking Places"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingAndSizeUI;
