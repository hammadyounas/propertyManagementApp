import React from "react";

const FooterUI = ({footerclassName, className}) => {
  return (
    <footer className={className + " " + footerclassName()}>
      <div className="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
          <div className="text-center ltr:md:text-start rtl:md:text-right text-sm">
            Property Management System , All rights Reserved
          </div>
          {/* <div className="ltr:md:text-right rtl:md:text-end text-center text-sm">
            Hand-crafted & Made by{" "}
            <a
              href="https://codeshaper.net"
              target="_blank"
              className="text-primary-500 font-semibold"
            >
              Codeshaper
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterUI;
