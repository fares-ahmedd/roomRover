import LinkButton from "../ui/LinkButton";

const links = [
  { href: "/hotel/new", label: "Add Hotels" },
  {
    href: "/my-hotels",
    label: "My Hotels",
  },
  {
    href: "/my-bookings",
    label: "My Bookings",
  },
];
type NavLinksProps = { menu?: boolean };
function NavLinks({ menu = false }: NavLinksProps) {
  return (
    <ul
      className={`flex items-center ${
        menu ? "grid container  space-y-4 my-6 px-4 w-fit" : "max-md:hidden"
      }`}
    >
      {links.map((link, index) => (
        <li key={link.href} className="flex items-center ">
          <LinkButton href={link.href}>{link.label}</LinkButton>
          {index < links.length - 1 && !menu && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
