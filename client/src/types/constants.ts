import { SiFlask, SiNodedotjs, SiSpring } from "react-icons/si";
import type { BackendInterface } from "./interfaces";

export const availableBackends: BackendInterface[] = [
  {
    name: "Node JS",
    icon: SiNodedotjs,
    endpoint: import.meta.env.VITE_NODE_ENDPOINT,
  },
  {
    name: "Spring",
    icon: SiSpring,
    endpoint: import.meta.env.VITE_SPRING_ENDPOINT,
  },
  {
    name: "Flask",
    icon: SiFlask,
    endpoint: import.meta.env.VITE_FLASK_ENDPOINT,
  },
];

