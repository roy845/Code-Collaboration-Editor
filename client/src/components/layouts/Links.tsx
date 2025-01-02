import { Link } from "react-router-dom";
import useLinks from "../../hooks/useLinks";
import { UserRoles } from "../../types/roles.types";
import { menuItems } from "../../constants/menu";
import { menuItemsType } from "../../types/menuItems.types";

const Links = (): React.JSX.Element => {
  const { decodedToken, location } = useLinks();

  return (
    <ul className="flex">
      {menuItems
        .filter((mi: menuItemsType) => {
          if (
            mi.name === "Admin" &&
            !decodedToken?.roles.includes(UserRoles.ADMIN)
          ) {
            return false;
          }
          return true;
        })
        .map((mi: menuItemsType) => {
          const isActive: boolean = location.pathname === mi.href;
          return (
            <Link to={mi.href} key={mi.name}>
              <li
                className={`min-w-[100px] p-2.5 rounded-xl font-medium text-center cursor-pointer border-gray-300 ${
                  isActive
                    ? "bg-slate-400 text-white"
                    : "hover:bg-slate-400 hover:text-white"
                }`}
              >
                {mi.name}
              </li>
            </Link>
          );
        })}
    </ul>
  );
};

export default Links;
