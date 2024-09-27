import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useContentWidth from "@/hooks/useContentWidth";
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from "@/hooks/useMenuHidden";
import useMobileMenu from "@/hooks/useMobileMenu";
import useMonoChrome from "@/hooks/useMonoChrome";
import { useSelector } from "react-redux";
import useRtl from "@/hooks/useRtl";
import useDarkMode from "@/hooks/useDarkMode";
import useSkin from "@/hooks/useSkin";
import useNavbarType from "@/hooks/useNavbarType";

const usePageLayout = () => {
  const { width, breakpoints } = useWidth();
  const [collapsed] = useSidebar();
  const [isRtl] = useRtl();
  const [isDark] = useDarkMode();
  const [skin] = useSkin();
  const [navbarType] = useNavbarType();
  const [isMonoChrome] = useMonoChrome();
  const router = useRouter();
//   const { isAuth } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!isAuth) {
//       router.push("/");
//     }
//     //darkMode;
//   }, [isAuth]);
  const location = usePathname();
  // header switch class
  const switchHeaderClass = () => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[248px] rtl:mr-[248px]";
    }
  };

  // content width
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  return {
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
  };
};

export default usePageLayout;
