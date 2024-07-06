import { getBookingsByHotelId, updateBookingStatus } from "@/lib/dataServices";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    if (!params.Id)
      return new NextResponse("Room id is required", { status: 400 });

    const booking = await updateBookingStatus(params.Id);

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at /api/booking/Id PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    if (!params.Id)
      return new NextResponse("Room id is required", { status: 400 });

    const bookings = await getBookingsByHotelId(params.Id);

    return NextResponse.json(bookings);
  } catch (error) {
    console.log("Error at /api/booking/Id GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { Id: string } }
// ) {
//   try {

//     if (!params.Id)
//       return new NextResponse("Room id is required", { status: 400 });

//     const room = await prismadb.room.delete({
//       where: { id: params.roomId },
//     });

//     return NextResponse.json(room);
//   } catch (error) {
//     console.log("Error at /api/room/roomId DELETE", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
