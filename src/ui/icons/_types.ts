export interface IconProps {
  className?: string;
}

export const Icons = {
  Asterik: "asterik",
  Check: "check",
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
  RightAltArrow: "right-alt-arrow",
  ArrowRight: "arrow-right",
  RightDiagonalArrow: "right-diagonal-arrow",
  Shirt: "shirt",
  Unmute: "unmute",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
