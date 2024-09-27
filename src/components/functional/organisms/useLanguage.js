import { useState } from "react";

const useLanguage = () => {
    const months = [
      { name: "En", image: "/assets/images/flags/usa.png" },
      { name: "Gn", image: "/assets/images/flags/gn.png" },
    ];
  const [selected, setSelected] = useState(months[0])
  return {
    selected,
    setSelected,
    months
  }
}

export default useLanguage