import { IconProps, Icons } from "./_types";
import ChurchIcon from "./church";
import ClockIcon from "./clock";
import DateIcon from "./date";
import HallIcon from "./hall";
import MapPinIcon from "./map-pin";
import MuteIcon from "./mute";
import RightDiagonalArrowIcon from "./right-diagonal-arrow";
import ShirtIcon from "./shirt";
import UnmuteIcon from "./unmute";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case "church":
      return <ChurchIcon {...props} />;

    case "clock":
      return <ClockIcon {...props} />;

    case "date":
      return <DateIcon {...props} />;

    case "hall":
      return <HallIcon {...props} />;

    case "map-pin":
      return <MapPinIcon {...props} />;

    case "mute":
      return <MuteIcon {...props} />;

    case "right-diagonal-arrow":
      return <RightDiagonalArrowIcon {...props} />;

    case "shirt":
      return <ShirtIcon {...props} />;

    case "unmute":
      return <UnmuteIcon {...props} />;

    default:
      return null;
  }
}
