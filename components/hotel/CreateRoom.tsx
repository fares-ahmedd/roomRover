import { MdBedroomParent } from "react-icons/md";
import Model from "../ui/Model";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

function CreateRoom() {
  return (
    <div className="border-t py-2 my-2 flex justify-end">
      <Model>
        <Model.OpenModel id="create-room">
          <span className="bg-btn-prim flex-center gap-1 text-btn-text py-2 px-4 rounded-full duration-300 hover:brightness-125  disabled-btn">
            Add a room to hotel <MdBedroomParent />
          </span>
        </Model.OpenModel>
        <Model.Content id="create-room">
          {({ close }) => (
            <div className="bg-sec-background text-main-text py-6 px-2 w-[100%] rounded-md  h-full overflow-auto">
              <h2 className="text-xl md:text-3xl font-bold">Add a room</h2>
              <p className="text-sec-text text-sm">
                Add details about a room in your hotel
              </p>

              <form>
                <Input
                  label="Provide a room name"
                  name="title"
                  title="Room Title"
                  placeholder="Double Room"
                />{" "}
                <TextArea
                  label="Is there anything special about this room?"
                  name="description"
                  title="Room Description"
                  placeholder="Please type Room Description"
                />
              </form>
            </div>
          )}
        </Model.Content>
      </Model>
    </div>
  );
}

export default CreateRoom;
