import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const DropdownUINew = ({ 
  label = "Select", 
  items = [], 
  onSelect, 
  wrapperClass = "", 
  labelClass = "",
  classMenuItems = "",
  classItem = "",
}) => {
  const [selected, setSelected] = useState(label);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle selection
  const handleSelect = (item) => {
    setSelected(item.label); 
    if (onSelect) {
      onSelect(item.value); // ✅ Ensure onSelect exists
    } else {
      console.error("onSelect function is undefined!");
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${wrapperClass}`} ref={dropdownRef}>
      <button 
        className={`w-full text-sm flex items-center justify-center px-4 py-2 bg-gray-200 rounded cursor-pointer ${labelClass}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        {isOpen ? <Icon icon="tdesign:chevron-up" className="text-xl" /> : <Icon icon="tdesign:chevron-down" className="text-xl" />}
      </button>

      {isOpen && (
        <div className={`absolute mt-2 w-full bg-white border rounded shadow-lg z-50 ${classMenuItems}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${classItem}`}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownUINew;
