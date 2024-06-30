import { Rooms } from "@/lib/types";
import CheckBox from "../ui/CheckBox";
type Props = {
  currentRoom: Rooms | undefined;
};
function RoomCheckboxList({ currentRoom }: Props) {
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
          checked={currentRoom?.roomService === true}
        />
        <CheckBox name="TV" label="TV" checked={currentRoom?.tv === true} />
        <CheckBox
          name="balcony"
          label="Balcony"
          checked={currentRoom?.balcony === true}
        />
        <CheckBox
          name="freeWifi"
          label="Free Wifi"
          checked={currentRoom?.freeWifi === true}
        />
        <CheckBox
          name="cityView"
          label="City View"
          checked={currentRoom?.cityView === true}
        />
        <CheckBox
          name="oceanView"
          label="Ocean View"
          checked={currentRoom?.oceanView === true}
        />
        <CheckBox
          name="forestView"
          label="Forest View"
          checked={currentRoom?.forestView === true}
        />
        <CheckBox
          name="mountainView"
          label="Mountain View"
          checked={currentRoom?.mountainView === true}
        />
        <CheckBox
          name="airConditions"
          label="Air Conditions"
          checked={currentRoom?.airConditions === true}
        />
        <CheckBox
          name="soundProofed"
          label="Sound Proofed"
          checked={currentRoom?.soundProofed === true}
        />
      </div>
    </div>
  );
}

export default RoomCheckboxList;
