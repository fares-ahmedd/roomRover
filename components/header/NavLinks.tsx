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

function NavLinks({ menu = false }: { menu?: boolean }) {
  return (
    <ul className={`flex items-center ${!menu && "max-md:hidden"}`}>
      {links.map((link, index) => (
        <li key={link.href} className="flex items-center">
          <LinkButton href={link.href}>{link.label}</LinkButton>
          {index < links.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
