import React from "react";

const CardUI = ({
  children,
  title,
  subtitle,
  headerslot,
  className = "custom-class  bg-white rounded-md",
  bodyClass = "p-6",
  noborder,
  titleClass = "custom-class ",
}) => {
  return (
    <div
      className={`
        card    dark:bg-slate-800   ${
        //   skin === "bordered"
        //     ? " border border-slate-200 dark:border-slate-700"
        //     : 
            "shadow-base"
        }
   
    ${className}
        `}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noborder ? "no-border" : ""}`}>
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerslot && <div className="card-header-slot">{headerslot}</div>}
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default CardUI;
