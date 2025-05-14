
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import { useEffect, useRef, useState } from "react";
import {menuItems as rawMenuItems} from "../constants/data";
import { useSelector } from "react-redux";
const useSidebarCustom = () => {
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

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();

    // 🔐 Get user from store (or context)
    const user = useSelector((state) => state.auth.user); // modify this based on how you access user

    // 🧠 Filter menu items based on role
    const menuItems = rawMenuItems.filter((item) => {
      if (user?.role === "BROKER" && item.title === "Brokers") {
        return false;
      }
      return true;
    });  

  return {
    scroll,
    collapsed,
    setMenuCollapsed,
    menuHover,
    setMenuHover,
    isSemiDark,
    skin,
    menuItems,
    scrollableNodeRef
  };
};

export default useSidebarCustom