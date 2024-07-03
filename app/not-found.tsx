import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center flex-col gap-6 container container-layout mx-auto mt-10">
      <h1 className="text-3xl font-semibold">Page Not Found !</h1>
      <p className="text-lg text-sec-text">
        The Page you&apos;re looking for is not defined
      </p>

      <Link href={"/"}>
        <PrimaryButton type="button">Go Home</PrimaryButton>
      </Link>
    </main>
  );
}
