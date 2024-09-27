import useNavmenu from "../../functional/organisms/useNavmenuUI";
import NavmenuUI from "../../ui/organisms/NavmenuUI";

const NavmenuUIContainer = ({ menus }) => {
  const { toggleSubmenu, activeSubmenu, locationName } = useNavmenu({ menus });
  return (
    <NavmenuUI
      toggleSubmenu={toggleSubmenu}
      menus={menus}
      activeSubmenu={activeSubmenu}
      locationName={locationName}
    />
  );
};

export default NavmenuUIContainer;
