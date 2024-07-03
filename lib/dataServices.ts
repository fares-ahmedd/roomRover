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
export async function createRoomInDatabase(formData: any) {
  const { error } = await supabase.from("rooms").insert([formData]);

  if (error) throw new Error(error.message);
}
export async function updateHotelInDatabase(id: string, formData: any) {
  const { data, error } = await supabase
    .from("hotels")
    .update(formData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}
export async function updateRoomInDatabase(roomId: string, formData: any) {
  const { error } = await supabase
    .from("rooms")
    .update(formData)
    .eq("id", roomId);

  if (error) throw new Error(error.message);
}

export async function deleteHotel(hotelId: string) {
  const { error } = await supabase.from("hotels").delete().eq("id", hotelId);

  if (error) throw new Error("could not delete hotel");
}
export async function deleteRoom(roomId: string) {
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);

  if (error) throw new Error("could not delete hotel");
}

export async function getAllHotelsWithRooms() {
  const { data, error } = await supabase.from("hotels").select(`
      *,
      rooms (*)
    `);

  if (error) {
    console.error("Error fetching hotels:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data;
}

export async function filterHotelsWithRooms(searchString: string | undefined) {
  const { data, error } = await supabase
    .from("hotels")
    .select(
      `
      *,
      rooms (*)
    `
    )
    .ilike("title", `%${searchString}%`);

  if (error) {
    console.error("Error fetching hotels:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data;
}
