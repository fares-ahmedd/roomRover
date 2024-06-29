import React from "react";

type Props = {
  name?: string;
  label?: string;
  placeholder?: string;
  title?: string;
  value?: any;
  type?: string;
};

function Input({
  name,
  label,
  placeholder,
  title,
  value,
  type = "text",
}: Props) {
  return (
    <>
      <span className="block">{title}</span>
      <label htmlFor={name} className="block text-sec-text text-sm mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        defaultValue={value}
        name={name}
        className="border rounded-lg py-1 px-2 w-full   mb-3 bg-sec-background "
        placeholder={placeholder}
      />
    </>
  );
}

export default Input;
