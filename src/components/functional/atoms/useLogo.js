import useWidth from "@/hooks/useWidth";
import useDarkMode from "@/hooks/useDarkMode";
const useLogo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  return {
    isDark,
    width,
    breakpoints
  }
};

export default useLogo;
