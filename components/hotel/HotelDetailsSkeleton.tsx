async function HotelDetailsSkeleton() {
  return (
    <div>
      <div className="flex-between">
        <h1 className="w-full max-w-[200px] h-8 animate-skeleton bg-sec-background rounded-lg"></h1>
        <div className="w-10 h-10 rounded-full animate-skeleton bg-sec-background"></div>
      </div>
      <p className="w-full max-w-[100px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>
      <div className="flex flex-wrap gap-3 max-sm:flex-col mb-3">
        <div className="min-h-[350px] relative flex-1 rounded-lg max-w-[600px] bg-sec-background animate-skeleton"></div>
        <div className="min-h-[350px]  w-[250px] bg-sec-background animate-skeleton" />
      </div>
      <p className="w-full max-w-[100px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>
      <p className="w-full max-w-[200px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>

      <p className="w-full max-w-[100px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>

      <p className="w-full max-w-[200px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>

      <p className="w-full max-w-[100px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>

      <ul className="grid-layout ">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="flex gap-2 items-center bg-sec-background rounded-lg p-2 max-w-[200px] h-10 justify-center animate-skeleton"
          ></li>
        ))}
      </ul>
      <p className="w-full max-w-[100px] h-8 animate-skeleton bg-sec-background rounded-lg my-3 "></p>

      <ul className="grid-layout">
        {Array.from({ length: 2 }, (_, index) => (
          <li
            key={index}
            className="flex gap-2 items-center bg-sec-background rounded-lg p-2 w-[400px] h-[500px] justify-center animate-skeleton"
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default HotelDetailsSkeleton;
