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
import { createRoom, updateRoom } from "@/lib/actions";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
interface AddHotelFormProps {
  hotel?: HotelWithRooms | null;
  room?: any;
}
function CreateAndUpdateRoom({ hotel, room }: AddHotelFormProps) {
  const currentRoom = hotel?.rooms.find((item: any) => item.id === room?.id);
  const [state, formAction] = useFormState(
    currentRoom ? updateRoom : createRoom,
    {}
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success && !currentRoom) {
      router.refresh();

      toast.success("Created room");
    }
    if (state?.success === false && !currentRoom) {
      toast.error("failed to create  room");
    }
    if (state?.success && currentRoom) {
      router.refresh();
      toast.success("updated room");
    }
    if (state?.success === false && currentRoom) {
      toast.error("failed to update room");
    }
  }, [state, hotel, currentRoom, router]);

  return (
    <div
      className={`${!currentRoom && "border-y"}  py-2 my-2  flex justify-end`}
    >
      <Model>
        <Model.OpenModel id="create-room">
          <span className="bg-btn-prim flex-center gap-1 text-btn-text py-2 px-4 rounded-full duration-300 hover:brightness-125  disabled-btn">
            {currentRoom ? (
              <>
                Edit Room <FaEdit />
              </>
            ) : (
              <>
                Add a room to hotel <MdBedroomParent />
              </>
            )}
          </span>
        </Model.OpenModel>
        <Model.Content id="create-room" isSuccess={state?.success}>
          {({ close }) => (
            <div className="bg-sec-background text-main-text py-6 px-4 w-[100%] rounded-md  h-full overflow-auto">
              <h2 className="text-xl md:text-3xl font-bold">
                {currentRoom ? "Update Post" : "Add room"}
              </h2>
              <p className="text-sec-text text-sm">
                Add details about a room in your hotel
              </p>

              <form action={formAction}>
                <Input
                  label="Provide a room name"
                  name="title"
                  title="Room Title"
                  placeholder="Double Room"
                  value={currentRoom?.title}
                />
                {state?.title && <p className="error-message">{state.title}</p>}
                <TextArea
                  label="Is there anything special about this room?"
                  name="description"
                  title="Room Description"
                  placeholder="Please type Room Description"
                  value={currentRoom?.description}
                />
                {state?.description && (
                  <p className="error-message">{state.description}</p>
                )}
                <RoomCheckboxList currentRoom={currentRoom} />
                <div className="grid justify-center">
                  <UploadImage hotel={currentRoom} />
                </div>
                {state?.image && <p className="error-message">{state.image}</p>}
                <div className="grid-layout my-4">
                  <section className="flex flex-col justify-between">
                    <Input
                      label="State the price for staying this room for 24hrs"
                      name="roomPrice"
                      title="Room price in USD"
                      type="number"
                      value={currentRoom?.roomPrice ?? 0}
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
                      value={currentRoom?.bedCount ?? 0}
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
                      value={currentRoom?.guestCount ?? 0}
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
                      value={currentRoom?.bathroomCount ?? 0}
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
                      value={currentRoom?.breakfastPrice ?? 0}
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
                      value={currentRoom?.kingBed ?? 0}
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
                      value={currentRoom?.queenBed ?? 0}
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
                  <SecondaryButton>
                    Confirm {currentRoom ? "Update" : "Create"}
                  </SecondaryButton>
                </main>
                <input type="hidden" name="hotelId" value={hotel?.id} />
                {currentRoom && (
                  <input type="hidden" name="roomId" value={currentRoom?.id} />
                )}{" "}
                {currentRoom && (
                  <input
                    type="hidden"
                    name="imageUrl"
                    value={currentRoom?.image}
                  />
                )}
              </form>
            </div>
          )}
        </Model.Content>
      </Model>
    </div>
  );
}

export default CreateAndUpdateRoom;
