import React from "react";

function CheckBox({
  label,
  name,
  checked,
}: {
  label: string;
  name: string;
  checked: boolean;
}) {
  return (
    <div className="space-x-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        value="Bike"
        className="cursor-pointer"
        defaultChecked={checked}
      />
      <label htmlFor={name} className="no-select">
        {" "}
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
