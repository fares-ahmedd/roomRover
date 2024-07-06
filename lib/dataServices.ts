import { auth } from "@clerk/nextjs/server";
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
export async function getHotelByUserId() {
  const { userId } = auth();

  const hotel = await supabase
    .from("hotels")
    .select(
      `
          *,
          rooms (*)
        `
    )
    .eq("userId", userId);

  if (!hotel?.data) return [];

  return hotel?.data;
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

export async function createBookingInDatabase(bookingData: any) {
  const { error } = await supabase.from("bookings").insert([bookingData]);

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

export async function updateBookingData(
  bookingData: any,
  payment_intent_id: string,
  userId: string
) {
  const { error } = await supabase
    .from("bookings")
    .update(bookingData)
    .match({ paymentIntentId: payment_intent_id, userId: userId });

  if (error) throw new Error(error.message);
}

export async function updateBookingStatus(paymentIntentId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ paymentStatus: true })
    .match({ paymentIntentId: paymentIntentId });

  if (error) {
    console.error("Error fetching bookings:", error);
    return null;
  }

  return data;
}

export async function getBookingsByHotelId(hotelId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("hotelId", hotelId);

  if (error) {
    console.error("Error fetching bookings:", error);
    return null;
  }

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

export const getFoundBooking = async (
  userId: string,
  paymentIntentId: string
) => {
  const { data, error } = await supabase
    .from("your_table_name")
    .select("*")
    .eq("userId", userId)
    .eq("paymentIntentId", paymentIntentId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return data;
};
