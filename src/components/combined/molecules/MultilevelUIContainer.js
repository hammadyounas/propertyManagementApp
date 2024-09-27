import MultilevelUI from "../../ui/molecules/MultilevelUI";

const MultilevelUIContainer = ({
  activeMultiMenu,
  j,
  subItem,
  locationName,
}) => {
  return (
    <MultilevelUI
      activeMultiMenu={activeMultiMenu}
      j={j}
      subItem={subItem}
      locationName={locationName}
    />
  );
};

export default MultilevelUIContainer;
