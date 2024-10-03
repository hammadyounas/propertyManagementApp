import BannerUI from "../../ui/molecules/BannerUI";

const Banner = ({ title, address, updatedAt }) => {
  return <BannerUI title={title} address={address} updatedAt={updatedAt} />;
};

export default Banner;
