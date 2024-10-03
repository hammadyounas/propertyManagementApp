import { useRouter, usePathname } from "next/navigation";
import { menuItems } from "../constants/data";
import { useEffect, useState } from "react";
const useBreadcrumbs = () => {
  const location = usePathname();
  const locationName = location?.replace("/", "");

  const [isHide, setIsHide] = useState(null);
  const [groupTitle, setGroupTitle] = useState("");

  useEffect(() => {
    const currentMenuItem = menuItems.find(
      (item) => item.link === locationName
    );

    const currentChild = menuItems.find((item) =>
      item.child?.find((child) => child.childlink === locationName)
    );

    if (currentMenuItem) {
      setIsHide(currentMenuItem.isHide);
    } else if (currentChild) {
      setIsHide(currentChild?.isHide || false);
      setGroupTitle(currentChild?.title);
    }
  }, [location, locationName]);

  return {
    locationName,
    isHide,
    groupTitle,
  };
};

export default useBreadcrumbs;
