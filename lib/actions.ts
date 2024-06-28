"use server";

import { auth } from "@clerk/nextjs";
import { uploadImage } from "./cloudinary";
import { createHotelInDatabase } from "./dataServices";
import { Errors } from "./types";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default async function createHotel(_: any, formData: any) {
  const { userId } = auth();
  const title = formData.get("title");
  const description = formData.get("description");
  const locationDescription = formData.get("locationDescription");
  const image = formData.get("image");
  const country = formData.get("country");
  const state = formData.get("state");
  const city = formData.get("city");
  const gym = formData.get("gym") ? true : false;
  const spa = formData.get("spa") ? true : false;
  const bar = formData.get("bar") ? true : false;
  const laundry = formData.get("laundry") ? true : false;
  const restaurant = formData.get("restaurant") ? true : false;
  const shopping = formData.get("shopping") ? true : false;
  const freeParking = formData.get("freeParking") ? true : false;
  const bikeRental = formData.get("bikeRental") ? true : false;
  const freeWifi = formData.get("freeWifi") ? true : false;
  const movieNights = formData.get("movieNights") ? true : false;
  const swimmingPool = formData.get("swimmingPool") ? true : false;
  const coffeeShop = formData.get("coffeeShop") ? true : false;

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

  if (!image || image.size === 0) {
    errors.image = "* image is required please select a hotel image";
  }
  // await new Promise((res) => setTimeout(res, 3000));
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

  redirect(`/hotel/${data.id}`);
}
