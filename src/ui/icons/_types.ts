export interface IconProps {
  className?: string;
}

export const Icons = {
  Church: "church",
  Clock: "clock",
  Date: "date",
  Hall: "hall",
  MapPin: "map-pin",
  Mute: "mute",
  RightDiagonalArrow: "right-diagonal-arrow",
  Shirt: "shirt",
  Unmute: "unmute",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
