import LinkButton from "../ui/LinkButton";
import { IoIosAdd } from "react-icons/io";
import { FaHotel } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";

const links = [
  { href: "/create-hotels", label: "Add Hotels", icon: <IoIosAdd /> },
  {
    href: "/my-hotels",
    label: "My Hotels",
    icon: <FaHotel className="text-sec-text text-sm" />,
  },
  {
    href: "/my-hotels",
    label: "My Bookings",
    icon: <FaBookBookmark className="text-sec-text text-sm" />,
  },
];

function NavLinks({ menu = false }: { menu?: boolean }) {
  return (
    <ul className={`flex items-center ${!menu && "max-md:hidden"}`}>
      {links.map((link, index) => (
        <li key={link.href} className="flex items-center">
          <LinkButton href={link.href}>
            {link.icon} {link.label}
          </LinkButton>
          {index < links.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
