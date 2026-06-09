export interface IconProps {
  className?: string;
}

export const Icons = {
  Church: "church",
  Clock: "clock",
  Date: "date",
  Hall: "hall",
  ArrowLeft: "arrow-left",
  MapPin: "map-pin",
  Mute: "mute",
  ArrowRight: "arrow-right",
  RightDiagonalArrow: "right-diagonal-arrow",
  Shirt: "shirt",
  Unmute: "unmute",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
