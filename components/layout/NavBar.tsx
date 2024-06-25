import { UserButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <header className="sticky top-0 bg-graph">
      NavBar
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}

export default NavBar;
