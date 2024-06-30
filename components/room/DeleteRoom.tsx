import { FaTrash } from "react-icons/fa";
import Model from "../ui/Model";
import PrimaryButton from "../ui/PrimaryButton";
import DeleteButton from "../ui/DeleteButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { deleteHotelAction, deleteRoomAction } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function DeleteRoom({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [state, formAction] = useFormState(deleteRoomAction, {
    success: null,
    redirectUrl: "",
  });
  useEffect(() => {
    if (state.success) {
      router.refresh();
      toast.success("Deleted Room successfully");
    } else if (state.success === false) {
      toast.error("Failed to delete Room");
    }
  }, [state, roomId, router]);

  return (
    <Model>
      <Model.OpenModel id="delete">
        <span className="delete-btn disabled:disabled-btn w-full">
          Delete <FaTrash />
        </span>
      </Model.OpenModel>
      <Model.Content
        id="delete"
        deleteModel={true}
        isSuccess={state.success === true}
      >
        {({ close }) => (
          <div className="bg-sec-background text-main-text py-6 px-2 w-full h-full rounded-md">
            <p className="text-center text-xl">
              Are you Sure You want to delete this Room?{" "}
            </p>
            <main className="flex items-center justify-end gap-2 mt-6">
              <PrimaryButton type="button" onClick={close}>
                Cancel
              </PrimaryButton>
              <form action={formAction}>
                <input type="hidden" name="roomId" value={roomId} />
                <DeleteButton />
              </form>
            </main>
          </div>
        )}
      </Model.Content>
    </Model>
  );
}

export default DeleteRoom;
