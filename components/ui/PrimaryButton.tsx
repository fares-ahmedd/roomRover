"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;

  onClick?: () => void;
  type: "button" | "submit";
};

function PrimaryButton({ children, onClick, type }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={pending}
      className="bg-btn-sec text-sm text-btn-text py-2 px-4 rounded-lg duration-300 border border-b-color hover:scale-90 uppercase hover:border-border-color-hover hover:font-bold   disabled-btn  "
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
