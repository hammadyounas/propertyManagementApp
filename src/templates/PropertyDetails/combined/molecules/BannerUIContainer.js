import BannerUI from "../../ui/molecules/BannerUI";

const Banner = ({ title, address, updatedAt, images }) => {
  return <BannerUI title={title} address={address} updatedAt={updatedAt} images={images}/>;
};

export default Banner;
