import React from "react";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  title: string;
  value: any;
};

function Input({ name, label, placeholder, title, value }: Props) {
  return (
    <>
      <span className="block">{title}</span>
      <label htmlFor={name} className="block text-sec-text text-sm mb-1">
        {label}
      </label>
      <input
        type="text"
        id={name}
        value={value}
        name={name}
        className="border rounded-lg py-1 px-2 w-full   mb-3 bg-sec-background "
        placeholder={placeholder}
      />
    </>
  );
}

export default Input;
