import useSidebarLogo from "../../functional/molecules/useSidebarLogo";
import SidebarLogoUI from "../../ui/molecules/SidebarLogoUI";

const SidebarLogoUIContainer = ({ menuHover }) => {
  const { isDark, collapsed, setMenuCollapsed, isSemiDark, skin } =
    useSidebarLogo({ menuHover });
  return (
    <SidebarLogoUI
      isDark={isDark}
      collapsed={collapsed}
      setMenuCollapsed={setMenuCollapsed}
      isSemiDark={isSemiDark}
      skin={skin}
      menuHover={menuHover}
    />
  );
};

export default SidebarLogoUIContainer;
