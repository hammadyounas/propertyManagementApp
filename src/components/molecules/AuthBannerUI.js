import Link from "next/link";

const AuthBannerUI = () => {
  return (
    <div
      className="left-column bg-cover bg-no-repeat bg-center "
      style={{
        backgroundImage: `url(/assets/images/all-img/login-bg.png)`,
      }}
    >
      <div className="flex flex-col h-full justify-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <Link href="/">
            <img
              src="assets/images/logo/logo-white.svg"
              alt=""
              className="mb-10"
            />
          </Link>
        </div>
        <div>
          <div className="black-500-title  mx-auto pb-20 text-center">
            Maximize your
            <br />
            <span className="text-white font-bold">
              Property Management Efficiency
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBannerUI;
