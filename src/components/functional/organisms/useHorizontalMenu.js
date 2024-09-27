import { usePathname } from "next/navigation";
import { topMenu } from "../constants/data";

const useHorizontalMenu = () => {
  const location = usePathname();
  return {
    location,
    topMenu,
  };
};

export default useHorizontalMenu;
