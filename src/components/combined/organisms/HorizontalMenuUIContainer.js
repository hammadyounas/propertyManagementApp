import useHorizontalMenu from "../../functional/organisms/useHorizontalMenu";
import HorizontalMenuUI from "../../ui/organisms/HorizontalMenuUI";

const HorizontalMenuUIContainer = () => {
  const { location, topMenu } = useHorizontalMenu();
  return <HorizontalMenuUI location={location} topMenu={topMenu}/>;
};

export default HorizontalMenuUIContainer;
