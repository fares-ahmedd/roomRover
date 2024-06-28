"use client";
import createHotel from "@/lib/actions";
import { HotelWithRooms } from "@/lib/types";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { FaEdit } from "react-icons/fa";
import CheckList from "../ui/CheckList";
import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import TextArea from "../ui/TextArea";
import UploadImage from "../ui/UploadImage";
import SelectLocation from "./SelectLocation";
import NoteMessage from "../ui/NoteMessage";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

function AddHotelForm({ hotel }: AddHotelFormProps) {
  const [state, formAction] = useFormState(createHotel, {});

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
        <div className="flex justify-end gap-2 ">
          <Link href={".."}>
            <PrimaryButton type={"button"}>Cancel</PrimaryButton>
          </Link>
          {!hotel && <SecondaryButton>Create a Hotel +</SecondaryButton>}
          {hotel && (
            <SecondaryButton>
              Edit Hotel <FaEdit />
            </SecondaryButton>
          )}
        </div>
        <NoteMessage>It may take some time to create your hotel</NoteMessage>
        {state?.unAuth && <p className="error-message">{state.unAuth}</p>}
      </section>
    </form>
  );
}

export default AddHotelForm;
