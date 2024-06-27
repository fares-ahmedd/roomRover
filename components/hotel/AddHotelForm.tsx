"use client";
import { HotelWithRooms } from "@/lib/types";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import CheckList from "../ui/CheckList";
import UploadImage from "../ui/UploadImage";
import SelectLocation from "./SelectLocation";
import SecondaryButton from "../ui/SecondaryButton";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";
import createHotel from "@/lib/actions";
import { FaEdit } from "react-icons/fa";
import { useFormState } from "react-dom";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

function AddHotelForm({ hotel }: AddHotelFormProps) {
  const [state, formAction] = useFormState(createHotel, {});

  return (
    <div className="container container-layout mx-auto my-2">
      <h1 className="text-lg md:text-3xl font-bold mb-4">
        Describe your hotel
      </h1>
      <form action={formAction} className="flex flex-col  md:flex-row gap-3">
        <section className="flex-1">
          <Input
            label="Provide your hotel name"
            name="title"
            placeholder="Beach hotel"
            title="Hotel Name"
          />
          {state?.title && <p className="error-message">{state.title}</p>}

          <TextArea
            label="Provide a detailed description of your hotel"
            name="description"
            placeholder="type description about your hotel"
            title="Hotel Description"
          />
          {state?.description && (
            <p className="error-message">{state.description}</p>
          )}

          <CheckList />
          <UploadImage hotel={hotel} />
          {state?.image && <p className="error-message">{state.image}</p>}
        </section>
        <section className="flex-1">
          <SelectLocation />
          {state?.country && <p className="error-message">{state.country}</p>}
          <TextArea
            label="Provide a detailed location description of your hotel"
            name="locationDescription"
            placeholder="Located at the vary end of the beach road"
            title="Location Description"
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
        </section>
      </form>
    </div>
  );
}

export default AddHotelForm;
