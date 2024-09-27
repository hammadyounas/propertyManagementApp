import useSubmenu from "../../functional/organisms/useSubmenu";
import SubmenuUI from "../../ui/organisms/SubmenuUI";

const SubmenuUIContainer = ({ activeSubmenu, item, i, locationName }) => {
  const { activeMultiMenu, toggleMultiMenu } = useSubmenu();
  return (
    <SubmenuUI
      activeMultiMenu={activeMultiMenu}
      toggleMultiMenu={toggleMultiMenu}
      activeSubmenu={activeSubmenu}
      item={item}
      i={i}
      locationName={locationName}
    />
  );
};

export default SubmenuUIContainer;
