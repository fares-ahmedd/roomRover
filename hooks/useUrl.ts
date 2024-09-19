import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return { searchParams, router, pathname };
}

export default useUrl;
