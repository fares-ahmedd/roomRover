import BookRoomClient from "@/components/booking/BookRoomClient";
export const metadata = {
  title: "Booking a room",
};

function page() {
  return (
    <div className="container container-layout mx-auto my-2">
      <BookRoomClient />
    </div>
  );
}

export default page;
