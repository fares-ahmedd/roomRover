function HotelsListSkeleton() {
  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <li key={index}>
              <div className="grid grid-cols-2 rounded-lg bg-sec-background group relative ">
                <div className=" min-h-[200px] md:min-h-[300px]  relative overflow-hidden rounded-s-lg animate-skeleton bg-main-background"></div>
                <section className="p-3 mt-3 flex flex-col justify-between">
                  <h5 className=" h-8 w-full animate-skeleton bg-main-background rounded-lg"></h5>
                  <p className="h-4 w-full animate-skeleton bg-main-background rounded-lg"></p>
                  <p className="h-4 w-full animate-skeleton bg-main-background rounded-lg"></p>
                  <p className="h-4 w-full animate-skeleton bg-main-background rounded-lg"></p>
                  <p className="h-4 w-full animate-skeleton bg-main-background rounded-lg"></p>
                </section>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default HotelsListSkeleton;
