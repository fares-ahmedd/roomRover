"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack}>
      <FaArrowLeft className="text-xl md:text-3xl" />
    </button>
  );
}

export default BackButton;
