import useSidebarCustom from "../../functional/organisms/useSidebar";
import SidebarUI from "../../ui/organisms/SidebarUI";

const SidebarUIContainer = () => {
  const {
    scroll,
    collapsed,
    setMenuCollapsed,
    menuHover,
    setMenuHover,
    isSemiDark,
    skin,
    menuItems,
    scrollableNodeRef
  } = useSidebarCustom();
  return (
    <SidebarUI
      scroll={scroll}
      collapsed={collapsed}
      setMenuCollapsed={setMenuCollapsed}
      menuHover={menuHover}
      setMenuHover={setMenuHover}
      isSemiDark={isSemiDark}
      skin={skin}
      menuItems={menuItems}
      scrollableNodeRef={scrollableNodeRef}
    />
  );
};

export default SidebarUIContainer;
