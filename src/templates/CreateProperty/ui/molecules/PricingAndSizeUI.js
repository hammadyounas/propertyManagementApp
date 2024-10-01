import Textinput from "@/components/ui/atoms/TextInput";
const PricingAndSizeUI = ({ register }) => {
  return (
    <div className="mt-8">
      <h6>Pricing & Size</h6>
      <div className="my-4">
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Textinput
              name="price"
              label="Price"
              type="number"
              register={register}
              //   error={errors.email}
              placeholder="Price"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
          <div className="w-6/12">
            <Textinput
              name="size"
              label="Size (square feet, marla, or kanal)"
              type="number"
              register={register}
              //   error={errors.email}
              placeholder="Size"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Textinput
              name="bedrooms"
              label="Bedrooms"
              type="number"
              register={register}
              //   error={errors.email}
              placeholder="Bedrooms"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
          <div className="w-6/12">
            <Textinput
              name="bathrooms"
              label="Bathrooms"
              type="number"
              register={register}
              //   error={errors.email}
              placeholder="Bathrooms"
              //   className="px-6"
              //   disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingAndSizeUI;
