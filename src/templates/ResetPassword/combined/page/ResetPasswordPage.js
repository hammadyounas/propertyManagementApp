import Link from "next/link";
import AuthBannerUI from "../../../../components/ui/molecules/AuthBannerUI";
import ResetPasswordFormContainer from "../organisms/useResetPasswordFormContainer";
import { AppRoutes } from "@/constants/appRoutes";

const ResetPasswordPage = () => {
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box2 flex flex-col justify-center h-full">
              {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/">
                  <img
                    src={"/assets/images/logo/logo.svg"}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div> */}
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium mb-4">Reset Your Password?</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Reset Password with{" "}
                  <span className="font-bold">Property Management System</span>.
                </div>
              </div>
              <ResetPasswordFormContainer />
              <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm">

                <Link
                  href={AppRoutes.HOME}
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Send me Back{" "}
                </Link>
                to The Sign In
              </div>
            </div>
          </div>
        </div>
        <AuthBannerUI />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
