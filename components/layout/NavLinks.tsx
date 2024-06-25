import LinkButton from "../ui/LinkButton";

const links = [
  { href: "/create-hotels", label: "Add Hotels" },
  { href: "/my-hotels", label: "My Hotels" },
  { href: "/my-hotels", label: "My Bookings" },
];

function NavLinks() {
  return (
    <ul className="flex items-center">
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
