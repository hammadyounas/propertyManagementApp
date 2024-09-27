"use client";
import React from "react";
import Link from "next/link";
import { FormContainer } from "../organisms/FormContainer";
import AuthBannerUI from "../../../../components/ui/molecules/AuthBannerUI";

const LoginPage = () => {
  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={"/assets/images/logo/logo.svg"}
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div> */}
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Welcome to{" "}
                    <span className="font-bold">
                      Property Management System
                    </span>
                    , your all-in-one solution for managing properties
                    efficiently. Sign in to streamline your operations and take
                    control of your property management tasks today.
                  </div>
                </div>
                <FormContainer />
              </div>
            </div>
          </div>
          <AuthBannerUI />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
