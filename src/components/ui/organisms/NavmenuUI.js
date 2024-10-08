import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/atoms/Icon";
import SubmenuUIContainer from "../../combined/organisms/SubmenuUIContainer";
const NavmenuUI = ({
  menus,
  activeSubmenu,
  toggleSubmenu,
  locationName,
  location,
}) => {
  return (
    <>
      <ul>
        {menus.map((item, i) => (
          <li
            key={i}
            className={` single-sidebar-menu 
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${
                locationName === item.link ||
                location?.startsWith(`${item.link}`)
                  ? "menu-item-active"
                  : ""
              }`}
          >
            {/* single menu with no childred*/}
            {!item.child && !item.isHeadr && (
              <Link className="menu-link" href={item.link}>
                <span className="menu-icon flex-grow-0">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box flex-grow">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </Link>
            )}
            {/* only for menulabel */}
            {item.isHeadr && !item.child && (
              <div className="menulabel">{item.title}</div>
            )}
            {/*    !!sub menu parent   */}
            {item.child && (
              <div
                className={`menu-link ${
                  (item?.child
                    ?.map((k) => {
                      return k.childlink;
                    })
                    .includes(locationName) ||
                    locationName?.startsWith("/email-templates")) &&
                  "bg-primary-default"
                } ${activeSubmenu === i ? `not-collapsed` : "collapsed"}`}
                onClick={() => toggleSubmenu(i)}
              >
                <div className="flex-1 flex items-start">
                  <span className="menu-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-0">
                  <div
                    className={`menu-arrow transform transition-all duration-300 ${
                      activeSubmenu === i ? " rotate-90" : ""
                    }`}
                  >
                    <Icon icon="heroicons-outline:chevron-right" />
                  </div>
                </div>
              </div>
            )}

            <SubmenuUIContainer
              activeSubmenu={activeSubmenu}
              item={item}
              i={i}
              locationName={locationName}
            />
          </li>
        ))}
        {/* <li className="single-sidebar-menu">
          <a
            href="https://dashcode-react-doc.codeshaper.tech/"
            target="_blank"
            className="menu-link"
          >
            <span className="menu-icon">
              <Icon icon="heroicons:document" />
            </span>
            <div className="text-box">Documeasdntation</div>
          </a>
        </li> */}
      </ul>
    </>
  );
};

export default NavmenuUI;
