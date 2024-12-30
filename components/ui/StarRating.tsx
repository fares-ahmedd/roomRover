import { FaStar } from "react-icons/fa6";

const RatingCircle = ({ rating }: { rating: number }) => {
  return (
    <div className="flex-center  size-10  text-yellow-200 bg-yellow-600  rounded-full  justify-center  absolute top-1 left-1 ">
      <span className="text-sm mr-[2px] ">{rating}</span>
      <FaStar className="size-3" />
    </div>
  );
};

export default RatingCircle;
