export interface IconProps {
  className?: string;
}

export const Icons = {
  Church: "church",
  Clock: "clock",
  Close: "close",
  Date: "date",
  Hall: "hall",
  IndexFingerUp: "index-finger-up",
  ArrowLeft: "arrow-left",
  MapPin: "map-pin",
  Menu: "menu",
  Mute: "mute",
  ArrowRight: "arrow-right",
  RightDiagonalArrow: "right-diagonal-arrow",
  Shirt: "shirt",
  Unmute: "unmute",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
