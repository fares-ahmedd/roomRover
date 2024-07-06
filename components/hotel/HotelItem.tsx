import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import RatingCircle from "../ui/StarRating";
import Link from "next/link";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  hotel: any;
  isEditing?: boolean;
  features: { isTrue: any; label: string; icon: any }[];
};

function HotelItem({ hotel, features, isEditing = false }: Props) {
  return (
    <li key={hotel.id}>
      {isEditing ? (
        <div className="grid grid-cols-2 rounded-lg bg-sec-background group relative ">
          {" "}
          <div className=" min-h-[200px] md:min-h-[300px]  relative overflow-hidden rounded-s-lg ">
            <Image
              src={hotel.image}
              alt={hotel.title}
              fill
              quality={100}
              className="rounded-s-lg duration-300  group-hover:scale-110 group-hover:brightness-50"
            />
            <Link
              href={`/hotel/${hotel.id}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[500px] duration-300 group-hover:-translate-y-1/2"
            >
              <PrimaryButton type="button">Edit</PrimaryButton>
            </Link>
          </div>
          <section className="p-3 mt-3">
            <h5
              className="truncate  text-lg md:text-xl lg:text-2xl font-bold"
              title={hotel.title}
            >
              {hotel.title}
            </h5>
            <p className="line-clamp-3 text-sec-text">{hotel.description}</p>
            <span className="truncate  flex gap-1 items-center text-sm">
              <IoLocation className="text-blue-800 text-base" />{" "}
              {hotel?.country}
              {hotel?.city && ` , ${hotel.city}`}
            </span>
            <ul className=" flex flex-wrap gap-2 mt-2 ">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="bg-main-background p-1 px-3 rounded-lg flex gap-2 text-sm items-center "
                >
                  {feature.icon} {feature.label}
                </li>
              ))}
            </ul>
            <RatingCircle rating={hotel.starRating} />
          </section>
        </div>
      ) : (
        <Link
          href={`hotel-details/${hotel.id}`}
          className="grid grid-cols-2 rounded-lg bg-sec-background group relative "
        >
          <div className=" min-h-[200px] md:min-h-[300px]  relative overflow-hidden rounded-s-lg">
            <Image
              src={hotel.image}
              alt={hotel.title}
              fill
              quality={100}
              className="rounded-s-lg duration-300  group-hover:scale-110"
            />
          </div>
          <section className="p-3 mt-3">
            <h5
              className="truncate  text-lg md:text-xl lg:text-2xl font-bold"
              title={hotel.title}
            >
              {hotel.title}
            </h5>
            <p className="line-clamp-3 text-sec-text">{hotel.description}</p>
            <span className="truncate  flex gap-1 items-center text-sm">
              <IoLocation className="text-blue-800 text-base" />{" "}
              {hotel?.country}
              {hotel?.city && ` , ${hotel.city}`}
            </span>
            <ul className=" flex flex-wrap gap-2 mt-2 ">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="bg-main-background p-1 px-3 rounded-lg flex gap-2 text-sm items-center "
                >
                  {feature.icon} {feature.label}
                </li>
              ))}
            </ul>
            <RatingCircle rating={hotel.starRating} />
          </section>
        </Link>
      )}
    </li>
  );
}

export default HotelItem;
