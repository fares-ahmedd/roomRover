import { supabase } from "./supabase";
export async function getHotelById(hotelId: string) {
  try {
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

    if (!hotel) return null;

    return hotel;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
