import React from "react";

function CheckBox({ label, name }: { label: string; name: string }) {
  return (
    <div className="space-x-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        value="Bike"
        className="cursor-pointer"
      />
      <label htmlFor={name} className="no-select">
        {" "}
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
