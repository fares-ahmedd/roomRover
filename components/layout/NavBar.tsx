import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";

function NavBar() {
  return (
    <header className="fixed w-full top-0 bg-sec-background border-b border-b-color  flex-between px-6 py-2 h-[78px] ">
      <Logo />
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}

export default NavBar;
