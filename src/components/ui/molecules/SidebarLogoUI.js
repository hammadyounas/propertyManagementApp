import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const SidebarLogoUI = ({
  isDark,
  collapsed,
  setMenuCollapsed,
  isSemiDark,
  skin,
  menuHover,
}) => {
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-black-default dark:bg-slate-800 z-[9] py-6  px-4 
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo - Full when expanded, Icon only when collapsed */}
        <div className={`logo-icon flex items-center justify-center transition-all duration-300 ${collapsed ? 'w-full' : 'flex-1'}`}>
          {!isDark && !isSemiDark ? (
            <img 
              src="/assets/images/logo/WHITE-LOGO.png" 
              alt="Logo" 
              className={`transition-all duration-300 ${collapsed ? 'w-10 h-10 object-contain' : 'w-[80%]'}`} 
            />
          ) : (
            <img 
              src="/assets/images/logo/BLACK-LOGO.png" 
              alt="Logo" 
              className={`transition-all duration-300 ${collapsed ? 'w-10 h-10 object-contain' : 'w-[80%]'}`} 
            />
          )}
        </div>

        {/* Toggle Button - Only visible when expanded */}
        {!collapsed && (
          <button
            onClick={() => setMenuCollapsed(!collapsed)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 cursor-pointer group flex-shrink-0 ml-2"
            title="Collapse Sidebar"
          >
            <Icon
              icon="heroicons:chevron-left"
              className="text-white dark:text-slate-300 text-xl group-hover:text-primary-default transition-colors"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarLogoUI;
