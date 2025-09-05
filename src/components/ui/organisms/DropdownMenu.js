import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ onEdit, onDelete, showEdit = false, showDelete = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleMenu = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left " ref={ref}>
      <Icon
        icon="charm:menu-kebab"
        className="cursor-pointer text-[20px]"
        onClick={toggleMenu}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
          {showEdit && (
            <button
              onClick={() => {
                onEdit?.();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Edit
            </button>
          )}
          {showDelete && (
            <button
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};


export default DropdownMenu;
