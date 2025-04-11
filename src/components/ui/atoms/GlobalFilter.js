import React, { useState } from "react";
import Textinput from "@/components/ui/atoms/TextInput";
const GlobalFilter = ({ filter, setFilter, placeholder, className }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <div className={className}>
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "search..."}
      />
    </div>
  );
};

export default GlobalFilter;
