import OverviewUI from "../../ui/molecules/OverviewUI";

const Overview = ({
  type,
  price,
  bedrooms,
  bathrooms,
  area,
  furnishingStatus,
  status,
}) => {
  return (
    <OverviewUI
      type={type}
      price={price}
      bedrooms={bedrooms}
      bathrooms={bathrooms}
      area={area}
      furnishingStatus={furnishingStatus}
      status={status}
    />
  );
};

export default Overview;
