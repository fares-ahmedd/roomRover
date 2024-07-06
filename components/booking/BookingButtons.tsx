"use client";
import Link from "next/link";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import Model from "../ui/Model";
import { FaTrash } from "react-icons/fa";
import DeleteButton from "../ui/DeleteButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/LoadingSpinner";

function BookingButtons({ booking }: { booking: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { hotels: hotel } = booking;

  console.log(booking);

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`/api/booking/${booking.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setIsLoading(false);
      toast.error("Failed to Delete booking");
      throw new Error("Failed to update booking status");
    }

    toast.success("Deleted Booking Success");
    setIsLoading(false);

    router.refresh();
  }
  return (
    <div className="flex-between flex-wrap gap-2">
      <Model>
        <Model.OpenModel id="delete-booking">
          <span className={`delete-btn disabled:disabled-btn w-full `}>
            Delete <FaTrash />
          </span>
        </Model.OpenModel>
        <Model.Content id="delete-booking" deleteModel={true}>
          {({ close }) => (
            <div className="bg-sec-background text-main-text py-6 px-2 w-full h-full rounded-md">
              <p className="text-center text-xl">
                Are you Sure You want to delete this Booking?{" "}
              </p>
              <main className="flex items-center justify-end gap-2 mt-6">
                <PrimaryButton type="button" onClick={close}>
                  Cancel
                </PrimaryButton>
                <form onSubmit={handleDelete}>
                  <DeleteButton />
                </form>
              </main>
            </div>
          )}
        </Model.Content>
      </Model>

      <Link href={`hotel-details/${booking.hotelId}`}>
        <PrimaryButton type="button">View Hotel</PrimaryButton>
      </Link>
      {!booking.paymentStatus && (
        <Link href={`/hotel-details/${hotel.id}`}>
          <SecondaryButton type="button">Pay Now</SecondaryButton>
        </Link>
      )}
    </div>
  );
}

export default BookingButtons;
