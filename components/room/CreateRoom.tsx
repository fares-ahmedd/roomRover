"use client";
import { MdBedroomParent } from "react-icons/md";
import Model from "../ui/Model";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import RoomCheckboxList from "./RoomCheckboxList";
import UploadImage from "../ui/UploadImage";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import { useFormState } from "react-dom";
import { HotelWithRooms } from "@/lib/types";
import { createRoom } from "@/lib/actions";
import toast from "react-hot-toast";
import { useEffect } from "react";
interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
  // userId: string;
}
function CreateRoom({ hotel }: AddHotelFormProps) {
  const [state, formAction] = useFormState(createRoom, {});

  useEffect(() => {
    if (state?.success) {
      toast.success("Created a  room");
    } else if (state?.success === false) {
      toast.error("failed to create a  room");
    }
  }, [state, hotel]);

  return (
    <div className="border-y py-2 my-2  flex justify-end">
      <Model>
        <Model.OpenModel id="create-room">
          <span className="bg-btn-prim flex-center gap-1 text-btn-text py-2 px-4 rounded-full duration-300 hover:brightness-125  disabled-btn">
            Add a room to hotel <MdBedroomParent />
          </span>
        </Model.OpenModel>
        <Model.Content id="create-room" isSuccess={state?.success}>
          {({ close }) => (
            <div className="bg-sec-background text-main-text py-6 px-4 w-[100%] rounded-md  h-full overflow-auto">
              <h2 className="text-xl md:text-3xl font-bold">Add a room</h2>
              <p className="text-sec-text text-sm">
                Add details about a room in your hotel
              </p>

              <form action={formAction}>
                <Input
                  label="Provide a room name"
                  name="title"
                  title="Room Title"
                  placeholder="Double Room"
                />
                {state?.title && <p className="error-message">{state.title}</p>}

                <TextArea
                  label="Is there anything special about this room?"
                  name="description"
                  title="Room Description"
                  placeholder="Please type Room Description"
                />
                {state?.description && (
                  <p className="error-message">{state.description}</p>
                )}

                <RoomCheckboxList />
                <div className="grid justify-center">
                  <UploadImage />
                </div>
                {state?.image && <p className="error-message">{state.image}</p>}
                <div className="grid-layout my-4">
                  <section className="flex flex-col justify-between">
                    <Input
                      label="State the price for staying this room for 24hrs"
                      name="roomPrice"
                      title="Room price in USD"
                      type="number"
                      value={0}
                    />
                    {state?.roomPrice && (
                      <p className="error-message">{state.roomPrice}</p>
                    )}
                  </section>{" "}
                  <section className="flex flex-col justify-between">
                    <Input
                      label="How many beds are available in this room"
                      name="bedCount"
                      title="Bed Count"
                      type="number"
                      value={0}
                    />
                    {state?.bedCount && (
                      <p className="error-message">{state.bedCount}</p>
                    )}
                  </section>{" "}
                  <section className="flex flex-col justify-between">
                    <Input
                      label="How many guests are allowed in this room"
                      name="guestCount"
                      title="Guest Count"
                      type="number"
                      value={0}
                    />
                    {state?.guestCount && (
                      <p className="error-message">{state.guestCount}</p>
                    )}
                  </section>{" "}
                  <section className="flex flex-col justify-between">
                    <Input
                      label="How many bathroom are in this room"
                      name="bathroomCount"
                      title="BathRoom Count"
                      type="number"
                      value={0}
                    />
                    {state?.bathroomCount && (
                      <p className="error-message">{state.bathroomCount}</p>
                    )}
                  </section>
                  <section className="flex flex-col justify-between">
                    <Input
                      label="Breakfast price in USD"
                      name="breakFastPrice"
                      title="BreakFast Price"
                      type="number"
                      value={0}
                    />
                    {state?.breakFastPrice && (
                      <p className="error-message">{state.breakFastPrice}</p>
                    )}
                  </section>
                  <section className="flex flex-col justify-between">
                    <Input
                      label="How many king beds are available in this room"
                      name="kingBed"
                      title="King Beds"
                      type="number"
                      value={0}
                    />
                    {state?.kingBed && (
                      <p className="error-message">{state.kingBed}</p>
                    )}
                  </section>
                  <section className="flex flex-col justify-between">
                    <Input
                      label="How many queen beds are available in this room"
                      name="queenBed"
                      title="Queen Beds"
                      type="number"
                      value={0}
                    />
                    {state?.queenBed && (
                      <p className="error-message">{state.queenBed}</p>
                    )}
                  </section>
                </div>
                <main className="flex gap-3 justify-end">
                  <PrimaryButton type="button" onClick={close}>
                    Cancel
                  </PrimaryButton>
                  <SecondaryButton>Confirm Create</SecondaryButton>
                </main>
                <input type="hidden" name="hotelId" value={hotel?.id} />
              </form>
            </div>
          )}
        </Model.Content>
      </Model>
    </div>
  );
}

export default CreateRoom;
