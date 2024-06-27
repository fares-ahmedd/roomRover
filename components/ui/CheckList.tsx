import CheckBox from "./CheckBox";

function CheckList() {
  return (
    <div>
      <span className="block">Choose Amenities</span>
      <label className="block text-sec-text text-sm mb-3">
        Choose Amenities popular in your hotel
      </label>

      <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
        <CheckBox name="gym" label="Gym" />
        <CheckBox name="spa" label="Spa" />
        <CheckBox name="bar" label="Bar" />
        <CheckBox name="laundry" label="Laundry" />
        <CheckBox name="restaurant" label="Restaurant" />
        <CheckBox name="shopping" label="Shopping" />
        <CheckBox name="freeParking" label="Free Parking" />
        <CheckBox name="bikeRental" label="Bike Rental" />
        <CheckBox name="freeWifi" label="Free Wifi" />
        <CheckBox name="movieNights" label="Movie Nights" />
        <CheckBox name="swimmingPool" label="Swimming Pool" />
        <CheckBox name="coffeeShop" label="Coffee Shop" />
      </div>
    </div>
  );
}

export default CheckList;
