import { SignedIn, UserButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <div>
      Test Na
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default NavBar;
