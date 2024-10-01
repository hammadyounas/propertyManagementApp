import React, { useRef, useEffect, useState } from "react";

import NavmenuUIContainer from "../../combined/organisms/NavMenuUIContainer";
import SimpleBar from "simplebar-react";
import Link from "next/link";
import Icon from "@/components/ui/atoms/Icon";

const MobileMenuUI = ({
  scroll,
  isSemiDark,
  skin,
  isDark,
  mobileMenu,
  setMobileMenu,
  menuItems,
  className,
  scrollableNodeRef,
}) => {
  return (
    <div
      className={`${className} fixed  top-0 bg-black-default dark:bg-slate-800 shadow-lg  h-full   w-[248px]`}
    >
      <div className="logo-segment flex justify-between items-center bg-black-default dark:bg-slate-800 z-[9] h-[85px]  px-4 ">
        {/* <Link href="/">
          <div className="flex items-center space-x-4">
            <div className="logo-icon">
              {!isDark && !isSemiDark ? (
                <img src="/assets/images/logo/logo-c.svg" alt="" />
              ) : (
                <img src="/assets/images/logo/logo-c-white.svg" alt="" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                DashCode
              </h1>
            </div>
          </div>
        </Link> */}
        <h6 className="text-white">LOGO</h6>
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="cursor-pointer text-white dark:text-white text-2xl"
        >
          <Icon icon="heroicons:x-mark" />
        </button>
      </div>

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
        {/* <div className="bg-slate-900 mb-24 lg:mb-10 mt-24 p-4 relative text-center rounded-2xl text-white">
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
        </div> */}
      </SimpleBar>
    </div>
  );
};

export default MobileMenuUI;
