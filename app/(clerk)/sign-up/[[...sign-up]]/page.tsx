import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "SignUp",
};

export default function Page() {
  return <SignUp />;
}
