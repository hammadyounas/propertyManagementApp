import { useState } from "react";

const useSubmenu = () => {
  const [activeMultiMenu, setMultiMenu] = useState(null);
  const toggleMultiMenu = (j) => {
    if (activeMultiMenu === j) {
      setMultiMenu(null);
    } else {
      setMultiMenu(j);
    }
  };

  return {
    activeMultiMenu,
    toggleMultiMenu
  }
}

export default useSubmenu