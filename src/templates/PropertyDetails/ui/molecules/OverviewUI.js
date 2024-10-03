import Icon from "@/components/ui/atoms/Icon";
import {
  AArrowDown,
  Armchair,
  Banknote,
  Bath,
  Bed,
  CircleCheckBig,
  House,
  LandPlot,
} from "lucide-react";
const OverviewUI = ({
  type,
  price,
  bedrooms,
  bathrooms,
  area,
  furnishingStatus,
  status,
}) => {
  return (
    <div className="my-4">
      <h2 className="text-lg">Property Overview</h2>
      <div className="flex flex-wrap my-4">
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <House className="mr-2 text-primary-default" />
          <p>{type}</p>
        </div>
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <Banknote className="mr-2 text-primary-default" />
          <p>{price}</p>
        </div>
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <Bed className="mr-2 text-primary-default" />
          <p>{bedrooms} Bedrooms</p>
        </div>
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <Bath className="mr-2 text-primary-default" />
          <p>{bathrooms} Bathrooms</p>
        </div>
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <LandPlot className="mr-2 text-primary-default" />
          <p>{area} sqft</p>
        </div>
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <Armchair className="mr-2 text-primary-default" />
          <p>{furnishingStatus}</p>
        </div>
        <div className="flex justify-center items-center mr-4 mt-2 border border-black-default p-2 border-dotted">
          <CircleCheckBig className="mr-2 text-primary-default" />
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewUI;
