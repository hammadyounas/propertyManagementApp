"use client";

import { useEffect, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import HeaderUIContainer from "../../combined/organisms/HeaderUIContainer";
import SidebarUIContainer from "../../combined/organisms/SidebarUIContainer";
// import Settings from "@/components/partials/settings";
import FooterUIContainer from "../../combined/organisms/FooterUIContainer";
// import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MobileMenuUIContainer from "../../combined/organisms/MobileMenuUIContainer";
import MobileFooterUIContainer from "../../combined/organisms/MobileFooterUIContainer";
import LoadingUIContainer from "../../combined/molecules/LoadingUIContainer";
import BreadcrumbsUIContainer from "../../combined/molecules/BreadcrumbsUIContainer";
import { motion, AnimatePresence } from "framer-motion";
export default function PageLayout({
  width,
  breakpoints,
  collapsed,
  isRtl,
  isDark,
  skin,
  navbarType,
  isMonoChrome,
  location,
  switchHeaderClass,
  contentWidth,
  mobileMenu,
  setMobileMenu,
  menuType,
  menuHidden,
  children,
  router
}) {
  return (
    (location == "/" || location == "/forgot-password") ? <div>{children}</div> :
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`app-warp    ${isDark ? "dark" : "light"} ${
        skin === "bordered" ? "skin--bordered" : "skin--default"
      }
      ${navbarType === "floating" ? "has-floating" : ""}
      `}
    >
      <ToastContainer />
      <HeaderUIContainer
        className={width > breakpoints.xl ? switchHeaderClass() : ""}
      />
      {menuType === "vertical" && width > breakpoints.xl && !menuHidden && (
        <SidebarUIContainer />
      )}
      <MobileMenuUIContainer
        className={`${
          width < breakpoints.xl && mobileMenu
            ? "left-0 visible opacity-100  z-[9999]"
            : "left-[-300px] invisible opacity-0  z-[-999] "
        }`}
      />
      {/* mobile menu overlay*/}
      {width < breakpoints.xl && mobileMenu && (
        <div
          className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}
      {/* <Settings /> */}
      <div
        className={`content-wrapper transition-all duration-150 ${
          width > 1280 ? switchHeaderClass() : ""
        }`}
      >
        {/* md:min-h-screen will h-full*/}
        <div className="page-content   page-min-height  ">
          <div
            className={
              contentWidth === "boxed" ? "container mx-auto" : "container-fluid"
            }
          >
            <motion.div
              key={location}
              initial="pageInitial"
              animate="pageAnimate"
              exit="pageExit"
              variants={{
                pageInitial: {
                  opacity: 0,
                  y: 50,
                },
                pageAnimate: {
                  opacity: 1,
                  y: 0,
                },
                pageExit: {
                  opacity: 0,
                  y: -50,
                },
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
            >
              <Suspense fallback={<LoadingUIContainer />}>
                <BreadcrumbsUIContainer />
                {children}
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>
      {width < breakpoints.md && <MobileFooterUIContainer router={router}/>}
      {width > breakpoints.md && (
        <FooterUIContainer
          className={width > breakpoints.xl ? switchHeaderClass() : ""}
        />
      )}
    </div>
  );
}
