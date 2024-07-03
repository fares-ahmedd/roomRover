"use server";

import { revalidatePath } from "next/cache";
import { uploadImage } from "./cloudinary";
import {
  createHotelInDatabase,
  createRoomInDatabase,
  deleteHotel,
  deleteRoom,
  updateHotelInDatabase,
  updateRoomInDatabase,
} from "./dataServices";
import { getData, getRoomData } from "./helpers";
import { DeleteHotelState, ErrorRoom, Errors } from "./types";

export async function createHotel(_: any, formData: any) {
  let errors: Errors = {};

  const {
    bar,
    bikeRental,
    starRating,
    city,
    coffeeShop,
    country,
    description,
    freeParking,
    freeWifi,
    gym,
    image,
    laundry,
    locationDescription,
    movieNights,
    restaurant,
    shopping,
    spa,
    state,
    swimmingPool,
    title,
    userId,
  } = getData(formData);
  if (!userId) {
    errors.unAuth = "* You're not able to create an Hotel !";
  }
  if (!title || title.trim().length === 0) {
    errors.title = "* Please write a valid Hotel Name";
  }
  if (!description || description.trim().length < 10) {
    errors.description =
      "* Please write a valid description (at least 10 character are required)";
  }
  if (!locationDescription || locationDescription.trim().length < 10) {
    errors.locationDescription =
      "* Please write a valid Location Description (at least 10 character are required)";
  }
  if (!country || country.trim().length === 0) {
    errors.country = "* Please Select a country";
  }

  if (!image || image.size === 0) {
    errors.image = "* image is required please select a hotel image";
  }
  if (!starRating || Number(starRating) === 0) {
    errors.starRating = "* Please Select a hotel Star Rating";
  }

  if (
    errors.country ||
    errors.description ||
    errors.image ||
    errors.locationDescription ||
    errors.title ||
    errors.unAuth ||
    errors.starRating
  ) {
    return errors;
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed please try again later");
  }

  try {
    const data = await createHotelInDatabase({
      title,
      userId,
      description,
      locationDescription,
      image: imageUrl,
      country: country.split("?")[0],
      latitude: country.split("?")[2],
      longitude: country.split("?")[3],
      state,
      city,
      gym,
      spa,
      bar,
      laundry,
      restaurant,
      shopping,
      freeParking,
      bikeRental,
      freeWifi,
      movieNights,
      swimmingPool,
      coffeeShop,
      starRating,
    });
    revalidatePath("/");
    return {
      success: true,
      redirectUrl: `/hotel/${data[0].id}`,
    };
  } catch {
    return {
      success: false,
    };
  }
}

export async function updateHotel(_: any, formData: any) {
  const {
    bar,
    bikeRental,
    starRating,
    city,
    coffeeShop,
    country,
    description,
    freeParking,
    freeWifi,
    gym,
    image,
    laundry,
    locationDescription,
    movieNights,
    restaurant,
    shopping,
    spa,
    state,
    swimmingPool,
    title,
    userId,
  } = getData(formData);
  const selectedImage = formData.get("imageUrl");
  const id = formData.get("id");
  let errors: Errors = {};

  if (!userId) {
    errors.unAuth = "* You're not able to create an Hotel !";
  }
  if (!title || title.trim().length === 0) {
    errors.title = "* Please write a valid Hotel Name";
  }
  if (!description || description.trim().length < 10) {
    errors.description =
      "* Please write a valid description (at least 10 character are required)";
  }
  if (!locationDescription || locationDescription.trim().length < 10) {
    errors.locationDescription =
      "* Please write a valid Location Description (at least 10 character are required)";
  }
  if (!country || country.trim().length === 0) {
    errors.country = "* Please Select a country";
  }
  if (!starRating || Number(starRating) === 0) {
    errors.starRating = "* Please Select a hotel Star Rating";
  }
  if (
    errors.country ||
    errors.description ||
    errors.locationDescription ||
    errors.title ||
    errors.unAuth ||
    errors.starRating
  ) {
    return errors;
  }

  let imageUrl;
  if (image.size > 0) {
    try {
      imageUrl = await uploadImage(image);
    } catch (error) {
      throw new Error("Image upload failed please try again later");
    }
  } else {
    imageUrl = selectedImage;
  }

  try {
    const data = await updateHotelInDatabase(id, {
      title,
      userId,
      description,
      locationDescription,
      image: imageUrl,
      country: country.split("?")[0],
      state,
      city,
      gym,
      spa,
      starRating,

      bar,
      laundry,
      restaurant,
      shopping,
      freeParking,
      bikeRental,
      freeWifi,
      movieNights,
      swimmingPool,
      coffeeShop,
    });

    revalidatePath("/", "layout");
    revalidatePath(`/hotel/${data[0].id}`);

    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteHotelAction(
  _: DeleteHotelState,
  formData: FormData
): Promise<DeleteHotelState> {
  const hotelId = formData.get("hotelId");

  try {
    await deleteHotel(hotelId as string);
    return { success: true, redirectUrl: `/` };
  } catch (error) {
    return { success: false, redirectUrl: "" };
  }
}
export async function deleteRoomAction(
  _: DeleteHotelState,
  formData: FormData
): Promise<DeleteHotelState> {
  const roomId = formData.get("roomId");

  try {
    await deleteRoom(roomId as string);
    return { success: true, redirectUrl: "/" };
  } catch (error) {
    return { success: false, redirectUrl: "" };
  }
}

export async function createRoom(_: any, formData: any) {
  let errors: ErrorRoom = {};

  const {
    hotelId,
    title,
    description,
    TV,
    image,
    roomPrice,

    soundProofed,
    airConditions,
    mountainView,
    forestView,
    balcony,
    cityView,
    oceanView,
    freeWifi,
    roomService,
    bedCount,
    guestCount,
    bathroomCount,
    breakFastPrice,
    kingBed,
    queenBed,
  } = getRoomData(formData);

  if (!title || title.trim().length === 0) {
    errors.title = "* Please write a valid Hotel Name";
  }
  if (!description || description.trim().length < 10) {
    errors.description =
      "* Please write a valid description (at least 10 character are required)";
  }

  if (!roomPrice || Number(roomPrice) === 0) {
    errors.roomPrice = "* Please write a valid Price";
  }

  if (!image || image.size === 0) {
    errors.image = "* image is required please select a hotel image";
  }

  if (!bedCount || Number(bedCount) > 10 || Number(bedCount) === 0) {
    errors.bedCount = "* Required (bed Count must be between 1 to 10) ";
  }
  if (!guestCount || Number(guestCount) > 10 || Number(guestCount) === 0) {
    errors.guestCount = "* Required (guest Count must be between 1 to 10) ";
  }
  if (
    !bathroomCount ||
    Number(bathroomCount) > 10 ||
    Number(bathroomCount) === 0
  ) {
    errors.bathroomCount =
      "* Required (bathroom Count must be between 1 to 10) ";
  }
  if (!kingBed || Number(kingBed) > 10 || Number(kingBed) === 0) {
    errors.kingBed = "* Required (kingBed Count must be between 1 to 10) ";
  }
  if (!queenBed || Number(queenBed) > 10 || Number(queenBed) === 0) {
    errors.queenBed = "* Required (queenBed Count must be between 1 to 10) ";
  }

  if (
    errors.roomPrice ||
    errors.description ||
    errors.image ||
    errors.title ||
    errors.bedCount ||
    errors.guestCount ||
    errors.bathroomCount ||
    errors.kingBed ||
    errors.queenBed
  ) {
    return errors;
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed please try again later");
  }

  try {
    await createRoomInDatabase({
      hotelId,
      title,
      description,
      TV,
      image: imageUrl,
      roomPrice,

      soundProofed,
      airConditions,
      mountainView,
      forestView,
      balcony,
      cityView,
      oceanView,
      freeWifi,
      roomService,
      bedCount,
      guestCount,
      bathroomCount,
      breakFastPrice,
      kingBed,
      queenBed,
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error?.message);

    return {
      success: false,
    };
  }
}

export async function updateRoom(_: any, formData: any) {
  let errors: ErrorRoom = {};

  const {
    roomId,
    title,
    description,
    TV,
    image,
    roomPrice,

    soundProofed,
    airConditions,
    mountainView,
    forestView,
    balcony,
    cityView,
    oceanView,
    freeWifi,
    roomService,
    bedCount,
    guestCount,
    bathroomCount,
    breakFastPrice,
    kingBed,
    queenBed,
  } = getRoomData(formData);
  const selectedImage = formData.get("imageUrl");
  if (!title || title.trim().length === 0) {
    errors.title = "* Please write a valid Hotel Name";
  }
  if (!description || description.trim().length < 10) {
    errors.description =
      "* Please write a valid description (at least 10 character are required)";
  }

  if (!roomPrice || Number(roomPrice) === 0) {
    errors.roomPrice = "* Please write a valid Price";
  }

  if (!bedCount || Number(bedCount) > 10 || Number(bedCount) === 0) {
    errors.bedCount = "* Required (bed Count must be between 1 to 10) ";
  }
  if (!guestCount || Number(guestCount) > 10 || Number(guestCount) === 0) {
    errors.guestCount = "* Required (guest Count must be between 1 to 10) ";
  }
  if (
    !bathroomCount ||
    Number(bathroomCount) > 10 ||
    Number(bathroomCount) === 0
  ) {
    errors.bathroomCount =
      "* Required (bathroom Count must be between 1 to 10) ";
  }
  if (!kingBed || Number(kingBed) > 10 || Number(kingBed) === 0) {
    errors.kingBed = "* Required (kingBed Count must be between 1 to 10) ";
  }
  if (!queenBed || Number(queenBed) > 10 || Number(queenBed) === 0) {
    errors.queenBed = "* Required (queenBed Count must be between 1 to 10) ";
  }

  if (
    errors.roomPrice ||
    errors.description ||
    errors.title ||
    errors.bedCount ||
    errors.guestCount ||
    errors.bathroomCount ||
    errors.kingBed ||
    errors.queenBed
  ) {
    return errors;
  }

  let imageUrl;
  if (image.size > 0) {
    try {
      imageUrl = await uploadImage(image);
    } catch (error) {
      throw new Error("Image upload failed please try again later");
    }
  } else {
    imageUrl = selectedImage;
  }

  try {
    await updateRoomInDatabase(roomId, {
      id: roomId,
      title,
      description,
      TV,
      image: imageUrl,
      roomPrice,

      soundProofed,
      airConditions,
      mountainView,
      forestView,
      balcony,
      cityView,
      oceanView,
      freeWifi,
      roomService,
      bedCount,
      guestCount,
      bathroomCount,
      breakFastPrice,
      kingBed,
      queenBed,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error?.message);

    return {
      success: false,
    };
  }
}
