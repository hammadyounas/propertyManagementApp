import useMobileMenuCustom from "../../functional/organisms/useMobileMenu";
import MobileMenuUI from "../../ui/organisms/MobileMenuUI";

const MobileMenuUIContainer = ({ className = "custom-class" }) => {
  const {
    scroll,
    isSemiDark,
    skin,
    isDark,
    mobileMenu,
    setMobileMenu,
    menuItems,
    scrollableNodeRef
  } = useMobileMenuCustom();
  return (
    <MobileMenuUI
      className={className}
      scroll={scroll}
      isSemiDark={isSemiDark}
      skin={skin}
      isDark={isDark}
      mobileMenu={mobileMenu}
      setMobileMenu={setMobileMenu}
      menuItems={menuItems}
      scrollableNodeRef={scrollableNodeRef}
    />
  );
};

export default MobileMenuUIContainer;
