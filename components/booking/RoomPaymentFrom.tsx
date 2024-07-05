"use client";
interface RoomPaymentFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

function RoomPaymentFrom({
  clientSecret,
  handleSetPaymentSuccess,
}: RoomPaymentFormProps) {
  const {};
  return <div>RoomPaymentFrom</div>;
}

export default RoomPaymentFrom;
