import React from "react";

function ClerkLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen flex-center">{children}</div>;
}

export default ClerkLayout;
