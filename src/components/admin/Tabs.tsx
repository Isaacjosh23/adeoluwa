import CardIcon from "@/ui/icons/card";
import GuestIcon from "@/ui/icons/guest";
import MenuGridIcon from "@/ui/icons/menu-grid";

export const TABS = [
  {
    label: "Overview",
    href: "/admin",
    icon: <MenuGridIcon className="size-7" />,
  },
  {
    label: "Guests",
    href: "/admin/guests",
    icon: <GuestIcon className="size-7" />,
  },
  {
    label: "Event Passes",
    href: "/admin/passes",
    icon: <CardIcon className="size-7" />,
  },
];
