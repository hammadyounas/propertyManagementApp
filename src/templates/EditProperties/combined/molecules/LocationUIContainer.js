import LocationUI from "../../ui/molecules/LocationUI";

const Location = ({ register, errors, loading }) => {
  return <LocationUI register={register} errors={errors} loading={loading} />;
};

export default Location;
