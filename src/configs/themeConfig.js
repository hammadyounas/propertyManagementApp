// import { v4 as uuidv4 } from "uuid";
const themeConfig = {
  app: {
    name: "Dashcode React",
  },
  // layout
  layout: {
    isRTL: false,
    darkMode: false,
    semiDarkMode: false,
    skin: "default",
    contentWidth: "full",
    type: "vertical",
    navBarType: "sticky",
    footerType: "static",
    isMonochrome: false,
    isCollapsed: true, // Sidebar initially collapsed
    menu: {
      isCollapsed: true, // Sidebar initially collapsed
      isHidden: false,
    },
    mobileMenu: false,
    customizer: false,
  },
};

export default themeConfig;
