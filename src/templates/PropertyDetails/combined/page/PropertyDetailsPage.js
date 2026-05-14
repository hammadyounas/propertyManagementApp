import Card from "../../../../components/combined/molecules/CardUIContainer";
import PropertyDetailsUI from "../../ui/organisms/PropertyDetailsUI";
import Amenities from "../molecules/AmenitiesUIContainer";
import Banner from "../molecules/BannerUIContainer";
import Details from "../molecules/DetailsUIContainer";
import Overview from "../molecules/OverviewUIContainer";
import UserDetails from "../molecules/UserDetailsUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import usePropertyDetails from "../../functionality/page/usePropertyDetails";
import Loading from "../../../../components/combined/atoms/LoadingUIContainer";
import Notes from "../molecules/NotesUIContainer";
import Documents from "../molecules/DocumentsUIContainer";
import Salesperson from "../molecules/SalespersonUIContainer";
import Location from "../molecules/LocationUIContainer";
import { Edit, Trash2, Plus } from "lucide-react";
import Comments from "../molecules/CommentsUIContainer";
import ComprehensivePropertyDetailsUI from "../../ui/molecules/ComprehensivePropertyDetailsUI";
import { propertyEditPath } from "@/constants/appRoutes";

const PropertyDetailsPage = () => {
  const {
    loading,
    propertyDetails,
    push,
    rows,
    documentDataRows,
    salesperosonDataRows,
    handleDelete,
    user,
  } = usePropertyDetails();
  console.log("propertyDetails", propertyDetails);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-between flex-wrap capitalize">
      {/* <UserDetails
        client={propertyDetails?.client}
        assignedTo={propertyDetails?.assigned_to}
      /> */}
      <PropertyDetailsUI>
        {/* Banner Section */}
        <Banner
          title={propertyDetails?.title}
          address={propertyDetails?.address}
          updatedAt={propertyDetails?.createdAt}
          images={propertyDetails?.images}
        />
        
        {/* Comprehensive Property Details */}
        <ComprehensivePropertyDetailsUI propertyDetails={propertyDetails} />
        
        {/* Enhanced Amenities Display */}
        <Amenities 
          amenities={propertyDetails?.amenities} 
          propertyDetails={propertyDetails}
        />
        
        {/* Salesperson Information */}
        <Salesperson
          salesperosonDataRows={propertyDetails?.assigned_to || []}
        />
        
        {/* Location Map */}
        <Location locationMapUrl={propertyDetails?.location_map_url} />
        
        {/* Comments Section */}
        <Comments user={user} />
        
        {/* Action Buttons */}
        <div className="flex justify-center md:justify-end mt-12 border-t pt-4">
          <Button
            onClick={() => push(propertyEditPath(propertyDetails?._id))}
            text={"Edit Property"}
            className={
              "md:!w-40 mx-4 bg-transparent border border-black-default !text-black-default hover:bg-gray-50"
            }
          />
          {/* <Button
            onClick={() => handleDelete(propertyDetails?._id)}
            text={"Delete"}
            className={"md:!w-36"}
          /> */}
        </div>
      </PropertyDetailsUI>
    </div>
  );
};

export default PropertyDetailsPage;
