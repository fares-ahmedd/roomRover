"use client";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function SecondaryButton({ children, onClick, className = "" }: Props) {
  const { pending } = useFormStatus();

  const getButtonText = () => {
    if (pending) {
      if (typeof children === "string") {
        return children.split(" ")[0] + "...";
      } else if (React.isValidElement(children)) {
        const childText = React.Children.toArray(children.props.children).join(
          " "
        );
        return childText.split(" ")[0] + "...";
      }
    }
    return children;
  };

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className={`bg-btn-prim flex-center gap-1 text-btn-text py-2 px-4 rounded-full duration-300 hover:brightness-125  disabled-btn ${className}`}
    >
      {getButtonText()}
    </button>
  );
}

export default SecondaryButton;
