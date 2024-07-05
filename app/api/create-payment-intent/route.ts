import {
  createBookingInDatabase,
  getFoundBooking,
  updateBookingData,
} from "@/lib/dataServices";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { booking, payment_intent_id } = body;

  const bookingData = {
    ...booking,
    userName: user.firstName,
    userEmail: user.emailAddresses[0].emailAddress,
    userId: user.id,
    currency: "usd",
    paymentIntentId: payment_intent_id,
  };

  let foundBooking;

  if (payment_intent_id) {
    foundBooking = await getFoundBooking(user.id, payment_intent_id);
  }

  if (foundBooking && payment_intent_id) {
    // update
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: booking.totalPrice * 100 }
      );

      await updateBookingData(bookingData, payment_intent_id, user.id);

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // create
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalPrice * 100,
      currency: bookingData.currency,
      automatic_payment_methods: { enabled: true },
    });

    bookingData.paymentIntentId = paymentIntent.id;

    await createBookingInDatabase(bookingData);
    return NextResponse.json({ paymentIntent });
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
