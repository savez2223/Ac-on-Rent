import Split from "../assets/Product Image/Split AC.png";
import WindowAC from "../assets/Product Image/Window Ac.png";
import RoomHeater from "../assets/Product Image/Room Heater2.png";
import Fridge from "../assets/Product Image/Fridge1.png";
import WashingMachine from "../assets/Product Image/Washing Mac.png";
import Geyser from "../assets/Product Image/Geyser2.png";

export const getProductImage = (productId: string) => {
  const images: Record<string, string> = {
    "window-ac": WindowAC,
    "split-ac": Split,
    "room-heater": RoomHeater,
    "geyser": Geyser,
    "refrigerator": Fridge,
    "washing-machine": WashingMachine,
  };
  return images[productId] || images["window-ac"];
};