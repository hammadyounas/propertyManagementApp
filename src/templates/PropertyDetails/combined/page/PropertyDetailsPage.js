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

const PropertyDetailsPage = () => {
  const { loading, propertyDetails, push } = usePropertyDetails();
  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-between flex-wrap">
      <UserDetails
        client={propertyDetails?.client}
        assignedTo={propertyDetails?.assigned_to}
      />
      <PropertyDetailsUI>
        <Banner
          title={propertyDetails?.title}
          address={propertyDetails?.address}
          updatedAt={propertyDetails?.updated_at}
        />
        <Overview
          type={propertyDetails?.type}
          price={propertyDetails?.price}
          bedrooms={propertyDetails?.bedrooms}
          bathrooms={propertyDetails?.bathrooms}
          area={propertyDetails?.area}
          furnishingStatus={propertyDetails?.furnishing_status}
          status={propertyDetails?.status}
        />
        <Details details={propertyDetails?.details} />
        <Amenities amenities={propertyDetails?.amenities} />
        <div className="flex justify-center md:justify-end mt-12">
          <Button
            onClick={() => push("/properties")}
            text={"Edit"}
            className={
              "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
            }
          />
          <Button
            onClick={() => push("/properties")}
            text={"Delete"}
            className={"md:!w-36"}
          />
        </div>
      </PropertyDetailsUI>
    </div>
  );
};

export default PropertyDetailsPage;
