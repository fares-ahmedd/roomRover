"use client";
import { deleteHotelAction } from "@/lib/actions";
import { HotelWithRooms } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import DeleteButton from "../ui/DeleteButton";
import Model from "../ui/Model";
import PrimaryButton from "../ui/PrimaryButton";
interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}
function DeleteHotel({ hotel }: AddHotelFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(deleteHotelAction, {
    success: null,
    redirectUrl: "",
  });
  useEffect(() => {
    if (state.success) {
      toast.success("Deleted hotel successfully");
      router.push("/");
      router.refresh();
    } else if (state.success === false) {
      toast.error("Failed to delete hotel");
    }
  }, [state, hotel, router]);
  return (
    <>
      {hotel && (
        <Model>
          <Model.OpenModel id="delete">
            <span className="delete-btn disabled:disabled-btn w-full">
              Delete <FaTrash />
            </span>
          </Model.OpenModel>
          <Model.Content id="delete" deleteModel={true}>
            {({ close }) => (
              <div className="bg-sec-background text-main-text py-6 px-2 w-full h-full rounded-md">
                <p className="text-center text-xl">
                  Are you Sure You want to delete this Hotel?{" "}
                </p>
                <main className="flex items-center justify-end gap-2 mt-6">
                  <PrimaryButton type="button" onClick={close}>
                    Cancel
                  </PrimaryButton>
                  <form action={formAction}>
                    <input type="hidden" name="hotelId" value={hotel.id} />
                    <DeleteButton />
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
