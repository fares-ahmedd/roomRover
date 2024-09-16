import { useEffect, useState } from "react";

type HotelsTitles = {
  title: string;
};
export default function useHotelsTitles() {
  const [hotels, setHotels] = useState<HotelsTitles[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch("/api/hotels");
      if (!res.ok) throw new Error("Something went wrong !");
      const hotels = await res.json();
      setHotels(hotels);
    };
    fetchHotels();
  }, []);

  return hotels;
}
