import { IconProps, Icons } from "./_types";
import MuteIcon from "./mute";
import UnmuteIcon from "./unmute";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case "mute":
      return <MuteIcon {...props} />;

    case "unmute":
      return <UnmuteIcon {...props} />;

    default:
      return null;
  }
}
