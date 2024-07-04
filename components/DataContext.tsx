"use client";
import React, { createContext, useContext, useState } from "react";

interface ModelContextType {
  range: { from: undefined | Date; to: undefined | Date };
  includeBreakfast: boolean;
  setRange: React.Dispatch<
    React.SetStateAction<{ from: undefined | Date; to: undefined | Date }>
  >;
  setIncludeBreakfast: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<ModelContextType | undefined>(undefined);

const initialState: { from: undefined | Date; to: undefined | Date } = {
  from: undefined,
  to: undefined,
};

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState(initialState);
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const value: ModelContextType = {
    range,
    setRange,
    includeBreakfast,
    setIncludeBreakfast,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useDataContext(): ModelContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Model context must be used within a Model provider");
  }
  return context;
}

export { useDataContext };
