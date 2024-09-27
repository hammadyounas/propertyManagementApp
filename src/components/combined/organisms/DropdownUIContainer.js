import useDropdown from "../../functional/organisms/useDropDown";
import DropdownUI from "../../ui/organisms/DropdownUI";

const DropdownUIContainer = ({
  label = "Dropdown",
  wrapperClass = "inline-block",
  labelClass = "label-class-custom",
  classMenuItems = "mt-2 w-[220px]",
  classItem = "px-4 py-2",
  className = "",
  children,
}) => {
  const { items } = useDropdown();
  return (
    <DropdownUI
      label={label}
      wrapperClass={wrapperClass}
      labelClass={labelClass}
      classMenuItems={classMenuItems}
      items={items}
      classItem={classItem}
      className={className}
      children={children}
    />
  );
};

export default DropdownUIContainer;
