import CheckBox from "../ui/CheckBox";

function RoomCheckboxList({ hotel }: { hotel: any }) {
  return (
    <div className="mb-6">
      <span className="block">Choose Room Amenities</span>
      <label className="block text-sec-text text-sm mb-3">
        What makes this room a good choice?
      </label>

      <div className="grid-layout">
        <CheckBox
          name="roomService"
          label="24 hrs Room Services"
          checked={hotel?.gym === true}
        />
        <CheckBox name="TV" label="TV" checked={hotel?.spa === true} />
        <CheckBox
          name="balcony"
          label="Balcony"
          checked={hotel?.bar === true}
        />
        <CheckBox
          name="freeWifi"
          label="Free Wifi"
          checked={hotel?.laundry === true}
        />
        <CheckBox
          name="cityView"
          label="City View"
          checked={hotel?.restaurant === true}
        />
        <CheckBox
          name="oceanView"
          label="Ocean View"
          checked={hotel?.shopping === true}
        />
        <CheckBox
          name="forestView"
          label="Forest View"
          checked={hotel?.freeParking === true}
        />
        <CheckBox
          name="mountainView"
          label="Mountain View"
          checked={hotel?.bikeRental === true}
        />
        <CheckBox
          name="airConditions"
          label="Air Conditions"
          checked={hotel?.freeWifi === true}
        />
        <CheckBox
          name="soundProofed"
          label="Sound Proofed"
          checked={hotel?.movieNights === true}
        />
        <CheckBox
          name="swimmingPool"
          label="Swimming Pool"
          checked={hotel?.swimmingPool === true}
        />
        <CheckBox
          name="coffeeShop"
          label="Coffee Shop"
          checked={hotel?.coffeeShop === true}
        />
      </div>
    </div>
  );
}

export default RoomCheckboxList;
