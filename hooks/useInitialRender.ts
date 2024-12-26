import { useEffect, useState } from "react";

function useInitialRender() {
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  return initialRender;
}

export default useInitialRender;
