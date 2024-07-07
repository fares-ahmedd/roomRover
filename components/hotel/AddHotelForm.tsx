"use client";
import { createHotel, updateHotel } from "@/lib/actions";
import { HotelWithRooms } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { FaEdit, FaEye } from "react-icons/fa";
import CreateAndUpdateRoom from "../room/CreateAndUpdateRoom";
import Rooms from "../room/Rooms";
import CheckList from "../ui/CheckList";
import Input from "../ui/Input";
import NoteMessage from "../ui/NoteMessage";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import TextArea from "../ui/TextArea";
import UploadImage from "../ui/UploadImage";
import DeleteHotel from "./DeleteHotel";
import HotelRating from "./HotelRating";
import SelectLocation from "./SelectLocation";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
  userId: string;
}

function AddHotelForm({ hotel, userId }: AddHotelFormProps) {
  const [state, formAction] = useFormState(
    hotel ? updateHotel : createHotel,
    {}
  );

  useEffect(() => {
    if (state.success && hotel) {
      toast.success("updated hotel done!");
    }
    if (state.success && !hotel) {
      toast.success("Created hotel successfully");
      redirect(state.redirectUrl ?? "/");
    }
    if (state.success === false && hotel) {
      toast.error("failed to update hotel");
    }
    if (state.success === false && !hotel) {
      toast.error("failed to Create hotel");
    }
  }, [state, hotel]);

  return (
    <form action={formAction} className="flex flex-col  md:flex-row gap-3">
      <section className="flex-1">
        <Input
          label="Provide your hotel name"
          name="title"
          placeholder="Beach hotel"
          title="Hotel Name"
          value={hotel?.title}
        />
        {state?.title && <p className="error-message">{state.title}</p>}

        <TextArea
          label="Provide a detailed description of your hotel"
          name="description"
          placeholder="type description about your hotel"
          title="Hotel Description"
          value={hotel?.description}
        />
        {state?.description && (
          <p className="error-message">{state.description}</p>
        )}

        <CheckList hotel={{ ...hotel }} />
        <UploadImage hotel={hotel} />
        {state?.image && <p className="error-message">{state.image}</p>}
      </section>
      <section className="flex-1">
        <HotelRating starRating={hotel?.starRating} />
        <SelectLocation
          state={hotel?.state}
          country={hotel?.country}
          city={hotel?.city}
        />
        {state?.country && <p className="error-message">{state.country}</p>}
        <TextArea
          label="Provide a detailed location description of your hotel"
          name="locationDescription"
          placeholder="Located at the vary end of the beach road"
          title="Location Description"
          value={hotel?.locationDescription}
        />
        {state?.locationDescription && (
          <p className="error-message">{state.locationDescription}</p>
        )}
        <div className="flex justify-end gap-2 flex-wrap-reverse ">
          {!hotel && (
            <Link href={".."}>
              <PrimaryButton type={"button"}>go back</PrimaryButton>
            </Link>
          )}
          <DeleteHotel hotel={hotel} />

          {hotel && (
            <Link href={`/hotel-details/${hotel.id}`}>
              <PrimaryButton type={"button"} className="flex-center gap-2">
                <span>View</span> <FaEye />
              </PrimaryButton>
            </Link>
          )}

          {!hotel && (
            <SecondaryButton type="submit">Create a Hotel +</SecondaryButton>
          )}
          {hotel && (
            <PrimaryButton className="max-sm:flex-1 flex gap-1" type="submit">
              Update Hotel <FaEdit />
            </PrimaryButton>
          )}
        </div>
        {hotel && <CreateAndUpdateRoom hotel={hotel} />}
        {(hotel?.rooms?.length ?? 0) > 0 && (
          <Rooms rooms={hotel?.rooms ?? []} hotel={hotel} />
        )}{" "}
        {hotel && (
          <NoteMessage>
            * One last step please add some rooms to complete your hotel setup!{" "}
          </NoteMessage>
        )}
        <NoteMessage>
          It may take some time to create your hotel or update your hotel
        </NoteMessage>
        {state?.unAuth && <p className="error-message">{state.unAuth}</p>}
      </section>
      {hotel && <input type="hidden" name="imageUrl" value={hotel.image} />}
      {hotel && <input type="hidden" name="id" value={hotel.id} />}
      <input type="hidden" name="userId" value={userId} />
    </form>
  );
}

export default AddHotelForm;
