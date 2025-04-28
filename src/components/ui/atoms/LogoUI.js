"use client";

import React, { Fragment } from "react";
import Link from "next/link";


const LogoUI = ({ isDark, width, breakpoints }) => {
  return (
    <div>
      {/* <Link href="/analytics"> */}
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? "/assets/images/logo/WHITE-LOGO.png"
                  : "/assets/images/logo/BLACK-LOGO.png"
              }
              alt=""
              className="w-24"
            />
          ) : (
            <img
              src={
                isDark
                  ? "/assets/images/logo/WHITE-LOGO.png"
                  : "/assets/images/logo/BLACK-LOGO.png"
              }
              alt=""
                className="w-24"
            />
          )}
        </React.Fragment>
      {/* </Link> */}
      {/* <h6>LOGO</h6> */}
    </div>
  );
};

export default LogoUI;
