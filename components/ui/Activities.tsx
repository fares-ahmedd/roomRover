import {
  FaDumbbell,
  FaSpa,
  FaGlassMartini,
  FaTshirt,
  FaUtensils,
  FaShoppingBag,
  FaParking,
  FaBicycle,
  FaWifi,
  FaFilm,
  FaSwimmer,
  FaCoffee,
} from "react-icons/fa";
function Activities({ hotel }: { hotel: any }) {
  const activitiesList = [
    { name: "gym", icon: <FaDumbbell />, isTrue: hotel.gym },
    { name: "spa", icon: <FaSpa />, isTrue: hotel.spa },
    { name: "bar", icon: <FaGlassMartini />, isTrue: hotel.bar },
    { name: "laundry", icon: <FaTshirt />, isTrue: hotel.laundry },
    { name: "restaurant", icon: <FaUtensils />, isTrue: hotel.restaurant },
    { name: "shopping", icon: <FaShoppingBag />, isTrue: hotel.shopping },
    { name: "freeParking", icon: <FaParking />, isTrue: hotel.freeParking },
    { name: "bikeRental", icon: <FaBicycle />, isTrue: hotel.bikeRental },
    { name: "freeWifi", icon: <FaWifi />, isTrue: hotel.freeWifi },
    { name: "movieNights", icon: <FaFilm />, isTrue: hotel.movieNights },
    { name: "swimmingPool", icon: <FaSwimmer />, isTrue: hotel.swimmingPool },
    { name: "coffeeShop", icon: <FaCoffee />, isTrue: hotel.coffeeShop },
  ];
  return (
    <>
      <h3 className="mb-1 text-lg md:text-xl font-bold my-2">
        Activities and Amenities
      </h3>

      <ul className="grid-layout ">
        {activitiesList.map(
          (item) =>
            item.isTrue && (
              <li
                key={item.name}
                className="flex gap-2 items-center bg-sec-background rounded-lg p-2 max-w-[200px] justify-center"
              >
                {item.name} {item.icon}
              </li>
            )
        )}
      </ul>
    </>
  );
}

export default Activities;
