const ratingArray = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

function HotelRating({ starRating }: { starRating: any }) {
  return (
    <div>
      <span className="block">Hotel Star Rating</span>
      <label
        htmlFor={"startRating"}
        className="block text-sec-text text-sm mb-1"
      >
        please select your hotel star rating
      </label>
      <select
        name="startRating"
        className="py-2 bg-sec-background px-4 w-full border rounded-md font-bold"
        id="startRating"
        value={starRating}
      >
        <option value="" disabled selected>
          Please select a star rating
        </option>
        {ratingArray.map((rating) => (
          <option key={rating} value={rating}>
            {rating} Star ⭐
          </option>
        ))}
      </select>
    </div>
  );
}

export default HotelRating;
