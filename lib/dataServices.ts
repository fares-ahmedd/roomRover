import { supabase } from "./supabase";
export async function getHotelById(hotelId: string) {
  const hotel = await supabase
    .from("hotels")
    .select(
      `
        *,
        rooms (*)
      `
    )
    .eq("id", hotelId)
    .single();

  if (!hotel.data) return null;

  return hotel;
}
