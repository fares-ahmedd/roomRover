import { HotelWithRooms } from "@/lib/types";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import CheckList from "../ui/CheckList";
import UploadImage from "../ui/UploadImage";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

function AddHotelForm({ hotel }: AddHotelFormProps) {
  return (
    <div className="container container-layout mx-auto my-2">
      <h1 className="text-lg md:text-3xl font-bold mb-4">
        Describe your hotel
      </h1>
      <form className="flex flex-col  md:flex-row gap-3">
        <section className="flex-1">
          <Input
            label="Provide your hotel name"
            name="title"
            placeholder="Beach hotel"
            title="Hotel Name"
          />
          <TextArea
            label="Provide a detailed description of your hotel"
            name="description"
            placeholder="type description about your hotel"
            title="Hotel Description"
          />
          <CheckList />
          <UploadImage hotel={hotel} />
        </section>
        <section className="flex-1">Another Section</section>
      </form>
    </div>
  );
}

export default AddHotelForm;
