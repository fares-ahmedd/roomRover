"use client";

import { useEffect, useState } from "react";

export default function ProgressBarProvider() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-600 z-50">
      <div
        className="h-full duration-500 ease-in-out bg-gradient-to-r animate-gradient-x  from-purple-500 via-pink-500 to-red-500 "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
