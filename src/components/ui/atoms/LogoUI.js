"use client";

import React, { Fragment } from "react";
import Link from "next/link";


const LogoUI = ({ isDark, width, breakpoints }) => {
  return (
    <div>
      {/* <Link href="/analytics">
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo-white.svg"
                  : "/assets/images/logo/logo.svg"
              }
              alt=""
            />
          ) : (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo-c-white.svg"
                  : "/assets/images/logo/logo-c.svg"
              }
              alt=""
            />
          )}
        </React.Fragment>
      </Link> */}
      <h6>LOGO</h6>
    </div>
  );
};

export default LogoUI;
