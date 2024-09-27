import useHeader from "../../functional/organisms/useHeader";
import HeaderUI from "../../ui/organisms/HeaderUI";

const HeaderUIContainer = ({ className = "custom-class" }) => {
  const {
    navbarTypeClass,
    borderSwicthClass,
    handleOpenMobileMenu,
    collapsed,
    setMenuCollapsed,
    width,
    breakpoints,
    menuType,
    isRtl,
  } = useHeader();
  return (
    <HeaderUI
      navbarTypeClass={navbarTypeClass}
      borderSwicthClass={borderSwicthClass}
      handleOpenMobileMenu={handleOpenMobileMenu}
      collapsed={collapsed}
      setMenuCollapsed={setMenuCollapsed}
      width={width}
      breakpoints={breakpoints}
      menuType={menuType}
      isRtl={isRtl}
      className={className}
    />
  );
};

export default HeaderUIContainer;
