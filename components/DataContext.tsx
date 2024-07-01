"use client";
import { createContext, useContext, useState } from "react";

interface ModelContextType {
  handleChange: (e: any) => void;
  query: string;
}

const DataContext = createContext<ModelContextType | undefined>(undefined);

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");

  console.log(query);

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const value = { query, setQuery, handleChange };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Model context must be used within a Model provider");
  }
  return context;
}

export { useDataContext };
