import { ToggleTheme } from "../ToggleTheme";
import Auth from "./Auth";
import Logo from "./Logo";
import Menu from "./Menu";
import NavLinks from "./NavLinks";

function NavBar() {
  return (
    <header className="sticky w-full top-0 left-0 bg-sec-background border-b border-b-color    h-[78px] container-layout  ">
      <div className="flex-between container  m-auto">
        <Logo />
        <NavLinks />
        <div className="space-x-2 flex-center gap-4 max-md:hidden">
          <ToggleTheme />
          <Auth />
        </div>

        <Menu />
      </div>
    </header>
  );
}

export default NavBar;
