import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const Dropdown = ({ label, labelClass = "", classMenuItems = "", classItem = "", items = [] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className={`bg-transparent text-slate-600 px-4 py-2 rounded-md flex items-center gap-2  transition ${labelClass}`}
      >
        {label}
        <Icon icon="heroicons:chevron-down" className="text-slate-600 text-lg" />
      </button>

      {open && (
        <div
          className={`absolute z-20 bg-white border border-gray-200 shadow-md rounded-md mt-2 w-32 ${classMenuItems}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`hover:bg-gray-100 px-4 py-2 cursor-pointer ${classItem}`}
              onClick={(e) => {
                item.onClick(e);
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
