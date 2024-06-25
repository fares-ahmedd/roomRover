import { SignedIn, UserButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <div>
      Navbar
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default NavBar;
