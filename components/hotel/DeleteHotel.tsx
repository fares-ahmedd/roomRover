"use client";
import { HotelWithRooms } from "@/lib/types";
import Model from "../ui/Model";
import PrimaryButton from "../ui/PrimaryButton";
import { deleteHotelAction } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}
function DeleteHotel({ hotel }: AddHotelFormProps) {
  const [state, formAction] = useFormState(deleteHotelAction, {
    success: null,
    redirectUrl: "",
  });
  useEffect(() => {
    if (state.success) {
      toast.success("Deleted hotel successfully");
      redirect(state.redirectUrl);
    } else if (state.success === false) {
      toast.error("Failed to delete hotel");
    }
  }, [state, hotel]);
  return (
    <>
      {hotel && (
        <Model>
          <Model.OpenModel id="delete" />
          <Model.Content id="delete">
            {({ close }) => (
              <div className="bg-sec-background text-main-text py-6 px-2 w-[100%] rounded-md">
                <p className="text-center">
                  Are you Sure You want to delete this Hotel?{" "}
                </p>
                <main className="flex items-center justify-end gap-2 mt-6">
                  <PrimaryButton type="button" onClick={close}>
                    Cancel
                  </PrimaryButton>
                  <form action={formAction}>
                    <input type="hidden" name="hotelId" value={hotel.id} />
                    <button
                      className="delete-btn"
                      type="submit"
                      onClick={close}
                    >
                      Confirm
                    </button>
                  </form>
                </main>
              </div>
            )}
          </Model.Content>
        </Model>
      )}
    </>
  );
}

export default DeleteHotel;
