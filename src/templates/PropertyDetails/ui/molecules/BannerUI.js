import Icon from "@/components/ui/atoms/Icon";
const BannerUI = ({ title, address, updatedAt }) => {
  return (
    <div>
      <img
        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
        className="w-full h-[350px]"
      />
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
        <p className="text-sm">Update {updatedAt}</p>
      </div>
    </div>
  );
};

export default BannerUI;
