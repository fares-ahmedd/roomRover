import { FaStar } from "react-icons/fa6";

const RatingCircle = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center text-yellow-200 bg-yellow-600 w-12 h-12 rounded-full  justify-center scale-75 absolute bottom-1 right-1 ">
      <span className="text-xl font-bold ">{rating}</span>
      <FaStar />
    </div>
  );
};

export default RatingCircle;
