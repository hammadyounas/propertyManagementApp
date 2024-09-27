import useSwitchDark from "../../functional/atoms/useSwitchDark";
import SwitchDarkUI from "../../ui/atoms/SwitchDarkUI";

const SwitchDarkUIContainer = () => {
  const { isDark, setDarkMode } = useSwitchDark();
  return <SwitchDarkUI isDark={isDark} setDarkMode={setDarkMode}/>;
};

export default SwitchDarkUIContainer;
