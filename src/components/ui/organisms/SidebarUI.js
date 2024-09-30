import React, { useRef, useEffect, useState } from "react";
import SidebarLogoUIContainer from "../../combined/molecules/SidebarLogoUIContainer";
import NavmenuUIContainer from "../../combined/organisms/NavMenuUIContainer";
import SimpleBar from "simplebar-react";

const SidebarUI = ({scroll, collapsed, setMenuHover, menuHover, isSemiDark, skin, menuItems, scrollableNodeRef}) => {
  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper bg-black-default dark:bg-slate-800     ${
          collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
        }
      ${menuHover ? "sidebar-hovered" : ""}
      ${
        skin === "bordered"
          ? "border-r border-slate-200 dark:border-slate-700"
          : "shadow-base"
      }
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogoUIContainer menuHover={menuHover} />
        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div>

        <SimpleBar
          className="sidebar-menu h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
          
        >
          <NavmenuUIContainer menus={menuItems} />
          {/* {!collapsed && (
            <div className="bg-slate-900 mb-16 mt-24 p-4 relative text-center rounded-2xl text-white">
              <img
                src="/assets/images/svg/rabit.svg"
                alt=""
                className="mx-auto relative -mt-[73px]"
              />
              <div className="max-w-[160px] mx-auto mt-6">
                <div className="widget-title">Unlimited Access</div>
                <div className="text-xs font-light">
                  Upgrade your system to business plan
                </div>
              </div>
              <div className="mt-6">
                <button className="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block">
                  Upgrade
                </button>
              </div>
            </div>
          )} */}
        </SimpleBar>
      </div>
    </div>
  );
};

export default SidebarUI;
