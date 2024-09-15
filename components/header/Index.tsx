import { ToggleTheme } from "../ToggleTheme";
import Auth from "./Auth";
import Logo from "./Logo";
import Menu from "./Menu";
import NavLinks from "./NavLinks";

function Header() {
  return (
    <header className="sticky w-full top-0 left-0 bg-sec-background border-b border-b-color shadow-md shadow-white/10     h-[78px] container-layout z-50  ">
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

export default Header;
