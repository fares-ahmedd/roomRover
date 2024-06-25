import React from "react";

function ClerkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen-78 py-6  flex-center max-sm:scale-75 max-sm:overflow-visible">
      {children}
    </div>
  );
}

export default ClerkLayout;
