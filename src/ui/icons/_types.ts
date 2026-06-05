export interface IconProps {
  className?: string;
}

export const Icons = {
  Mute: "mute",
  Unmute: "unmute",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
