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

const PropertyDetailsPage = () => {
  const { loading, propertyDetails, push, rows, documentDataRows, salesperosonDataRows } = usePropertyDetails();
 
const iframeHtml = `
<iframe
  src="${propertyDetails?.location_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28968.491278753427!2d67.02223737519975!3d24.827573438137424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e84755a83d3%3A0xf49fbe49c4a0095e!2sibex.%20Pakistan!5e0!3m2!1sen!2s!4v1731342989428!5m2!1sen!2s"}"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
`;
  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-between flex-wrap">
      {/* <UserDetails
        client={propertyDetails?.client}
        assignedTo={propertyDetails?.assigned_to}
      /> */}
      <PropertyDetailsUI>
        <Banner
          title={propertyDetails?.title}
          address={propertyDetails?.address}
          updatedAt={propertyDetails?.updated_at}
          images={propertyDetails?.images}
        />
        <Overview
          type={propertyDetails?.property_type}
          price={propertyDetails?.price}
          bedrooms={propertyDetails?.bedrooms}
          bathrooms={propertyDetails?.bathrooms}
          area={propertyDetails?.area}
          furnishingStatus={propertyDetails?.furnishing_status}
          status={propertyDetails?.property_status}
        />
        <Details details={propertyDetails?.description} />
        <Amenities amenities={propertyDetails?.amenities} />
        <Documents documentDataRows={documentDataRows} />
        <Salesperson salesperosonDataRows={salesperosonDataRows}/>
        <Notes rows={rows}/>
        <Location locationMapUrl={propertyDetails?.location_map_url}/>
        {/* <div className="my-4">
          <h2 className="text-lg">Location</h2>
          <div className="flex flex-wrap my-4 w-full">
            <div
              id="map"
              style={{ textAlign: "center", width:'100%' }}
              dangerouslySetInnerHTML={{ __html: iframeHtml }}
            />
          </div>
        </div> */}
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
