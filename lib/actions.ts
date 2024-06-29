"use server";

import { uploadImage } from "./cloudinary";
import {
  createHotelInDatabase,
  deleteHotel,
  updateHotelInDatabase,
} from "./dataServices";
import { getData, getRoomData } from "./helpers";
import { DeleteHotelState, ErrorRoom, Errors } from "./types";

export async function createHotel(_: any, formData: any) {
  let errors: Errors = {};

  const {
    bar,
    bikeRental,
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

  if (
    errors.country ||
    errors.description ||
    errors.image ||
    errors.locationDescription ||
    errors.title ||
    errors.unAuth
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
      country,
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
    });
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

  if (
    errors.country ||
    errors.description ||
    errors.locationDescription ||
    errors.title ||
    errors.unAuth
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
    await updateHotelInDatabase(id, {
      title,
      userId,
      description,
      locationDescription,
      image: imageUrl,
      country,
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
    });
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

export async function createRoom(_: any, formData: any) {
  let errors: ErrorRoom = {};

  const {
    hotelId,
    title,
    description,
    TV,
    image,
    roomPrice,
    state,
    city,
    swimmingPool,
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
    coffeeShop,
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
    errors.roomPrice =
      "* Please write a valid Location Description (at least 10 character are required)";
  }
  if (!country || country.trim().length === 0) {
    errors.country = "* Please Select a country";
  }

  if (!image || image.size === 0) {
    errors.image = "* image is required please select a hotel image";
  }

  if (
    errors.country ||
    errors.description ||
    errors.image ||
    errors.locationDescription ||
    errors.title ||
    errors.unAuth
  ) {
    return errors;
  }

  // let imageUrl;
  // try {
  //   imageUrl = await uploadImage(image);
  // } catch (error) {
  //   throw new Error("Image upload failed please try again later");
  // }

  // try {
  //   const data = await createHotelInDatabase({
  //     title,
  //     userId,
  //     description,
  //     locationDescription,
  //     image: imageUrl,
  //     country,
  //     state,
  //     city,
  //     gym,
  //     spa,
  //     bar,
  //     laundry,
  //     restaurant,
  //     shopping,
  //     freeParking,
  //     bikeRental,
  //     freeWifi,
  //     movieNights,
  //     swimmingPool,
  //     coffeeShop,
  //   });
  //   return {
  //     success: true,
  //     redirectUrl: `/hotel/${data[0].id}`,
  //   };
  // } catch {
  //   return {
  //     success: false,
  //   };
  // }
}
