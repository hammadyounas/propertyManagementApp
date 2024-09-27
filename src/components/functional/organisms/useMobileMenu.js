import useMobileMenu from "@/hooks/useMobileMenu";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import useDarkMode from "@/hooks/useDarkMode";
import { useEffect, useRef, useState } from "react";
import { menuItems } from "../constants/data"

const useMobileMenuCustom = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  const [isDark] = useDarkMode();
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  return {
    className: "custom-class",
    scroll,
    isSemiDark,
    skin,
    isDark,
    mobileMenu,
    setMobileMenu,
    menuItems,
    scrollableNodeRef
  };
};

export default useMobileMenuCustom;
