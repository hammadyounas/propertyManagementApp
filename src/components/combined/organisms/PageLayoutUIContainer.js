import usePageLayout from "../../functional/organisms/usePageLayout";
import PageLayout from "../../ui/organisms/PageLayoutUI";

const PageLayoutUIContainer = ({ children }) => {
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
    <PageLayout
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

export default PageLayoutUIContainer;
