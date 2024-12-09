import PricingAndSizeUI from "../../ui/molecules/PricingAndSizeUI";

const PricingAndSize = ({ register, errors, loading }) => {
  return (
    <PricingAndSizeUI register={register} errors={errors} loading={loading} />
  );
};

export default PricingAndSize;
