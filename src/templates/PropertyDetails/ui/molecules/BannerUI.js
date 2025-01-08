import Icon from "@/components/ui/atoms/Icon";
import moment from "moment/moment";
const BannerUI = ({ title, address, updatedAt, images }) => {
  return (
    <div className="">
      <div className="flex w-full">
      <img
        // src={"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"}
        src={images? images[0] : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"}
        className="min-w-[90%] max-h-[80vh] mx-auto object-cover"
      />
      </div>
      <h1 className="text-2xl mt-4">{title}</h1>
      <div className="flex items-center">
        <Icon
          icon="heroicons-outline:map-pin"
          className="text-primary-default mr-2"
        />
        <p className="text-sm">{address}</p>
        <span className="mx-4">|</span>
        <Icon
          icon="heroicons-outline:calendar"
          className="text-primary-default mr-2"
        />
        <p className="text-sm">Created At {moment(updatedAt).format("DD-MM-YYYY")}</p>
      </div>
    </div>
  );
};

export default BannerUI;
