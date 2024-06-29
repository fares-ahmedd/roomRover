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
  console.log(hotel);

  if (!hotel.data) return null;

  return hotel.data;
}

export async function createHotelInDatabase(formData: any) {
  const { data, error } = await supabase
    .from("hotels")
    .insert([formData])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateHotelInDatabase(id: string, formData: any) {
  const { error } = await supabase.from("hotels").update(formData).eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteHotel(hotelId: string) {
  const { error } = await supabase.from("hotels").delete().eq("id", hotelId);

  if (error) throw new Error("could not delete hotel");
}
