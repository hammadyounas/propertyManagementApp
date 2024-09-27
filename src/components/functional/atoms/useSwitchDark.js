import useDarkMode from "@/hooks/useDarkMode";

const useSwitchDark = () => {
  const [isDark, setDarkMode] = useDarkMode();
  return {
    isDark,
    setDarkMode
  }
};

export default useSwitchDark;
