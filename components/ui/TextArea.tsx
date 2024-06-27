import React from "react";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  title: string;
};

function TextArea({ name, label, placeholder, title }: Props) {
  return (
    <>
      <span className="block">{title}</span>
      <label htmlFor={name} className="block  text-sec-text text-sm mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="border bg-sec-background rounded-lg py-1 px-2  w-full mb-3 "
        placeholder={placeholder}
        rows={5}
      />
    </>
  );
}

export default TextArea;
