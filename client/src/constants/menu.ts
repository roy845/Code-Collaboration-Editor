import { menuItemsType } from "../types/menuItems.types";

export const ADMIN_NAME: string = "Admin";
export const ADMIN_LINK: string = "/admin";

export const PROFILE_NAME: string = "Profile";

export const menuItems = (userId: string | null): menuItemsType[] => [
  {
    name: ADMIN_NAME,
    href: ADMIN_LINK,
  },
  {
    name: PROFILE_NAME,
    href: userId ? `/profile/${userId}` : "/profile",
  },
];
