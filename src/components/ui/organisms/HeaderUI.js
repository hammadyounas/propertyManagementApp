import React from "react";
import Icon from "@/components/ui/atoms/Icon";
import SwitchDarkUIContainer from "@/components/combined/atoms/SwitchDarkUIContainer";
import HorizontalMenuUIContainer from "@/components/combined/organisms/HorizontalMenuUIContainer";
import LogoUIContainer from "../../combined/atoms/LogoUIContainer";
import SearchModalUIContainer from "../../combined/organisms/SearchModalUIContainer";
import ProfileUIContainer from "../../combined/organisms/ProfileUIContainer";
import NotificationUIContainer from "../../combined/organisms/NotificationUIContainer";
import MessageUIContainer from "../../combined/organisms/MessageUIContainer";
import LanguageUIContainer from "../../combined/organisms/LanguageUIContainer";

const HeaderUI = ({
  navbarTypeClass,
  borderSwicthClass,
  handleOpenMobileMenu,
  collapsed,
  setMenuCollapsed,
  width,
  breakpoints,
  menuType,
  isRtl,
  className
}) => {
  return (
    <header className={className + " " + navbarTypeClass()}>
      <div
        className={` app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base dark:shadow-base3 bg-white
        ${borderSwicthClass()}
             ${
               menuType === "horizontal" && width > breakpoints.xl
                 ? "py-1"
                 : "md:py-6 py-3"
             }
        `}
      >
        <div className="flex justify-between items-center h-full">
          {/* For Vertical  */}

          {menuType === "vertical" && (
            <div className="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse">
              {collapsed && width >= breakpoints.xl && (
                <button
                  className="text-xl text-slate-900 dark:text-white"
                  onClick={() => setMenuCollapsed(!collapsed)}
                >
                  {isRtl ? (
                    <Icon icon="akar-icons:arrow-left" />
                  ) : (
                    <Icon icon="akar-icons:arrow-right" />
                  )}
                </button>
              )}
              {width < breakpoints.xl && <LogoUIContainer />}
              {/* open mobile menu handlaer*/}
              {width < breakpoints.xl && width >= breakpoints.md && (
                <div
                  className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
              {/* <SearchModalUIContainer /> */}
            </div>
          )}
          {/* For Horizontal  */}
          {menuType === "horizontal" && (
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LogoUIContainer />
              {/* open mobile menu handlaer*/}
              {width <= breakpoints.xl && (
                <div
                  className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
            </div>
          )}
          {/*  Horizontal  Main Menu */}
          {menuType === "horizontal" && width >= breakpoints.xl ? (
            <HorizontalMenuUIContainer />
          ) : null}
          {/* Nav Tools  */}
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
            {/* <LanguageUIContainer />
            <SwitchDarkUIContainer /> */}

            {/* {width >= breakpoints.md && <MessageUIContainer />}
            {width >= breakpoints.md && <NotificationUIContainer />} */}
            {width >= breakpoints.md && <ProfileUIContainer />}
            {width <= breakpoints.md && (
              <div
                className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                onClick={handleOpenMobileMenu}
              >
                <Icon icon="heroicons-outline:menu-alt-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUI;
