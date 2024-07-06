"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, useContext, useState } from "react";

interface ModelContextType {
  range: { from: undefined | Date; to: undefined | Date };
  resetData: () => void;
  includeBreakfast: boolean;
  setPaymentIntentId: React.Dispatch<React.SetStateAction<string | null>>;
  paymentIntentId: null | string;
  setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
  clientSecret: null | string;
  setRange: React.Dispatch<
    React.SetStateAction<{ from: undefined | Date; to: undefined | Date }>
  >;
  setIncludeBreakfast: React.Dispatch<React.SetStateAction<boolean>>;
  bookingRoomData: {
    room: any;
    totalPrice: number;
    breakFastIncluded: boolean;
    startDate: Date;
    endDate: Date;
  };
  setBookingRoomData: (
    value:
      | {
          room: any;
          totalPrice: number;
          breakFastIncluded: boolean;
          startDate: Date;
          endDate: Date;
        }
      | ((prevState: {
          room: any;
          totalPrice: number;
          breakFastIncluded: boolean;
          startDate: Date;
          endDate: Date;
        }) => {
          room: any;
          totalPrice: number;
          breakFastIncluded: boolean;
          startDate: Date;
          endDate: Date;
        })
  ) => void;
}

const DataContext = createContext<ModelContextType | undefined>(undefined);

const initialState: { from: undefined | Date; to: undefined | Date } = {
  from: undefined,
  to: undefined,
};

const initialData: {
  room: any;
  totalPrice: number;
  breakFastIncluded: boolean;
  startDate: Date;
  endDate: Date;
} = {
  room: {},
  totalPrice: 0,
  breakFastIncluded: false,
  startDate: new Date(),
  endDate: new Date(),
};

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState(initialState);
  const [paymentIntentId, setPaymentIntentId] = useLocalStorage<null | string>(
    "paymentIntentId",
    null
  );
  const [clientSecret, setClientSecret] = useLocalStorage<null | string>(
    "clientSecret",
    null
  );
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const [bookingRoomData, setBookingRoomData] = useLocalStorage<{
    room: any;
    totalPrice: number;
    breakFastIncluded: boolean;
    startDate: Date;
    endDate: Date;
  }>("bookingData", initialData);
  const resetData = () => {
    setRange(initialState);
    setPaymentIntentId(null);
    setClientSecret(null);
    setIncludeBreakfast(false);
    setBookingRoomData(initialData);
    localStorage.setItem("paymentIntentId", "");
    localStorage.setItem("clientSecret", "");
  };

  const value: ModelContextType = {
    range,
    setRange,
    includeBreakfast,
    setIncludeBreakfast,
    setBookingRoomData,
    bookingRoomData,
    paymentIntentId,
    setPaymentIntentId,
    clientSecret,
    setClientSecret,
    resetData,
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
