import { IconProps, Icons } from "./_types";
import AsterikIcon from "./asterik";
import CheckIcon from "./check";
import ChurchIcon from "./church";
import ClockIcon from "./clock";
import CloseIcon from "./close";
import DateIcon from "./date";
import HallIcon from "./hall";
import IndexFingerUp from "./index-finger-up";
import LeftArrowIcon from "./left-arrow";
import MapPinIcon from "./map-pin";
import MenuIcon from "./menu";
import MuteIcon from "./mute";
import RightAltArrowIcon from "./right-alt-arrow";
import RightArrowIcon from "./right-arrow";
import RightDiagonalArrowIcon from "./right-diagonal-arrow";
import ShirtIcon from "./shirt";
import UnmuteIcon from "./unmute";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case "asterik":
      return <AsterikIcon {...props} />;

    case "check":
      return <CheckIcon {...props} />;

    case "church":
      return <ChurchIcon {...props} />;

    case "clock":
      return <ClockIcon {...props} />;

    case "close":
      return <CloseIcon {...props} />;

    case "date":
      return <DateIcon {...props} />;

    case "hall":
      return <HallIcon {...props} />;

    case "index-finger-up":
      return <IndexFingerUp {...props} />;

    case "arrow-left":
      return <LeftArrowIcon {...props} />;

    case "map-pin":
      return <MapPinIcon {...props} />;

    case "menu":
      return <MenuIcon {...props} />;

    case "mute":
      return <MuteIcon {...props} />;

    case "right-alt-arrow":
      return <RightAltArrowIcon {...props} />;

    case "arrow-right":
      return <RightArrowIcon {...props} />;

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
