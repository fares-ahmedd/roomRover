"use client";
import { useFormStatus } from "react-dom";

function DeleteButton({ disabled = false }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      className="delete-btn flex-center disabled:bg-red-950 "
      type="submit"
    >
      {pending || disabled ? "Confirming..." : "Confirm"}
    </button>
  );
}

export default DeleteButton;
