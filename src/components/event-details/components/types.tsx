import ChurchIcon from "@/ui/icons/church";
import ClockIcon from "@/ui/icons/clock";
import DateIcon from "@/ui/icons/date";
import HallIcon from "@/ui/icons/hall";
import MapPinIcon from "@/ui/icons/map-pin";

export interface DetailCard {
  number: string;
  icon: React.ReactNode;
  label: string;
  venue: string;
  locationIcon?: React.ReactNode;
  time: string;
  timeIcon?: React.ReactNode;
  date: string;
  dateIcon?: React.ReactNode;
  location: string;
  mapUrl: string;
  access?: string;
}

export const DETAILS: DetailCard[] = [
  {
    number: "①",
    icon: <ChurchIcon className="size-10 sm:size-12 text-(--color-gold)" />,
    label: "Church Ceremony",
    venue: "The Cathedral Of ST Barnabas",
    time: "10:00 AM",
    timeIcon: <ClockIcon className="size-10 text-(--color-gold)" />,
    date: "Saturday, 15th August 2026",
    dateIcon: <DateIcon className="size-10 text-(--color-gold)" />,
    location: "Sabo-Oke, Ilorin, Kwara State",
    locationIcon: <MapPinIcon className="size-10 text-(--color-gold)" />,
    mapUrl: "https://maps.app.goo.gl/EnPQ2EhFdyoV5yie6",
  },
  {
    number: "②",
    icon: <HallIcon className="size-10 sm:size-12 text-(--color-gold)" />,
    label: "Reception",
    venue: "Diamond Arena",
    time: "2:00 PM",
    timeIcon: <ClockIcon className="size-10 text-(--color-gold)" />,
    date: "Saturday, 15th August 2026",
    dateIcon: <DateIcon className="size-10 text-(--color-gold)" />,
    location: "Diamond Arena, Ilorin, Kwara State",
    locationIcon: <MapPinIcon className="size-10 text-(--color-gold)" />,
    mapUrl: "https://maps.app.goo.gl/ufAkMH9yKBJBnast5",
    access: "Strictly by invitation",
  },
];
