import CheckBox from "./CheckBox";

function CheckList({ hotel }: { hotel: any }) {
  return (
    <div className="mb-6">
      <span className="block">Choose Amenities</span>
      <label className="block text-sec-text text-sm mb-3">
        Choose Amenities popular in your hotel
      </label>

      <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
        <CheckBox name="gym" label="Gym" checked={hotel.gym === true} />
        <CheckBox name="spa" label="Spa" checked={hotel.spa === true} />
        <CheckBox name="bar" label="Bar" checked={hotel.bar === true} />
        <CheckBox
          name="laundry"
          label="Laundry"
          checked={hotel.laundry === true}
        />
        <CheckBox
          name="restaurant"
          label="Restaurant"
          checked={hotel.restaurant === true}
        />
        <CheckBox
          name="shopping"
          label="Shopping"
          checked={hotel.shopping === true}
        />
        <CheckBox
          name="freeParking"
          label="Free Parking"
          checked={hotel.freeParking === true}
        />
        <CheckBox
          name="bikeRental"
          label="Bike Rental"
          checked={hotel.bikeRental === true}
        />
        <CheckBox
          name="freeWifi"
          label="Free Wifi"
          checked={hotel.freeWifi === true}
        />
        <CheckBox
          name="movieNights"
          label="Movie Nights"
          checked={hotel.movieNights === true}
        />
        <CheckBox
          name="swimmingPool"
          label="Swimming Pool"
          checked={hotel.swimmingPool === true}
        />
        <CheckBox
          name="coffeeShop"
          label="Coffee Shop"
          checked={hotel.coffeeShop === true}
        />
      </div>
    </div>
  );
}

export default CheckList;
