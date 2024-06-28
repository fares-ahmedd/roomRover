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

export async function createHotelInDatabase(formData: any) {
  const { data, error } = await supabase.from("hotels").insert([formData]);

  if (error) throw new Error(error.message);

  return data;
}
