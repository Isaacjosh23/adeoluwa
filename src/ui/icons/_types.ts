export interface IconProps {
  className?: string;
}

export const Icons = {
  Asterik: "asterik",
  Card: "card",
  Check: "check",
  Church: "church",
  Clock: "clock",
  Close: "close",
  Date: "date",
  Delete: "delete",
  Exit: "exit",
  guest: "guest",
  Hall: "hall",
  IndexFingerUp: "index-finger-up",
  ArrowLeft: "arrow-left",
  MapPin: "map-pin",
  Menu: "menu",
  MenuGrid: "menu-grid",
  Messages: "messages",
  Mute: "mute",
  RightAltArrow: "right-alt-arrow",
  ArrowRight: "arrow-right",
  RightDiagonalArrow: "right-diagonal-arrow",
  Shirt: "shirt",
  Unmute: "unmute",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
