import Link from "next/link";
import AuthBannerUI from "../../../../components/molecules/AuthBannerUI";
import SignUpFormUIContainer from "../organisms/SignUpFormUIContainer";

const SignUpPage = () => {
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/">
                  <img
                    src={"/assets/images/logo/logo.svg"}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium">Sign up</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Create an account to start using Dashcode
                </div>
              </div>
              <SignUpFormUIContainer />
              <div className="max-w-[225px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                Already registered?{" "}
                <Link
                  href="/"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AuthBannerUI />
      </div>
    </div>
  );
};

export default SignUpPage;
