import usePageLayout from "../../functional/organisms/usePageLayout";
import PageLayoutUI from "../../ui/organisms/PageLayoutUI";

const PageLayout = ({ children }) => {
  const {
    width,
    breakpoints,
    collapsed,
    isRtl,
    isDark,
    skin,
    navbarType,
    isMonoChrome,
    location,
    switchHeaderClass,
    contentWidth,
    mobileMenu,
    setMobileMenu,
    menuType,
    menuHidden,
    router,
  } = usePageLayout();
  return (
    <PageLayoutUI
      width={width}
      breakpoints={breakpoints}
      collapsed={collapsed}
      isRtl={isRtl}
      isDark={isDark}
      skin={skin}
      navbarType={navbarType}
      isMonoChrome={isMonoChrome}
      location={location}
      switchHeaderClass={switchHeaderClass}
      contentWidth={contentWidth}
      mobileMenu={mobileMenu}
      setMobileMenu={setMobileMenu}
      menuType={menuType}
      children={children}
      menuHidden={menuHidden}
      router={router}
    />
  );
};

export default PageLayout;
