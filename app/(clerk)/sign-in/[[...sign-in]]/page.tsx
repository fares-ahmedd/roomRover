import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return <SignIn />;
}
