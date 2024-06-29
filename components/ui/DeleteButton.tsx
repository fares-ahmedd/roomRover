"use client";
import { useFormStatus } from "react-dom";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="delete-btn flex-center disabled:bg-red-950 "
      type="submit"
    >
      {pending ? "Confirming..." : "Confirm"}
    </button>
  );
}

export default DeleteButton;
