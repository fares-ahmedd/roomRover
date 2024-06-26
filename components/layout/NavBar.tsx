import { UserButton } from "@clerk/nextjs";
import PrimaryButton from "../ui/PrimaryButton";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { ToggleTheme } from "../ToggleTheme";
import Menu from "./Menu";

function NavBar() {
  return (
    <header className="sticky w-full top-0 left-0 bg-sec-background border-b border-b-color    h-[78px] container-layout  ">
      <div className="flex-between container  m-auto">
        <Logo />
        <NavLinks />
        <div className="space-x-2 flex-center max-md:hidden">
          <ToggleTheme />
          <UserButton afterSignOutUrl="/" />
          <PrimaryButton>SignUp</PrimaryButton>
          <PrimaryButton>Login</PrimaryButton>
        </div>

        <Menu />
      </div>
    </header>
  );
}

export default NavBar;
