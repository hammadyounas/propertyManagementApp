import useLogo from "../../functional/atoms/useLogo";
import LogoUI from "../../ui/atoms/LogoUI";

const LogoUIContainer = () => {
  const { isDark, width, breakpoints } = useLogo();
  return <LogoUI isDark={isDark} width={width} breakpoints={breakpoints}/>;
};

export default LogoUIContainer;
