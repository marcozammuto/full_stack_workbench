import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SiSpring, SiFlask, SiNodedotjs } from "react-icons/si";
import type { IconType } from "react-icons";

const BackendSwitch = () => {
  interface BackendInterface {
    label: string;
    icon: IconType;
  }

  const backends: { label: string; icon: IconType }[] = [
    { label: "Spring", icon: SiSpring },
    { label: "Flask", icon: SiFlask },
    { label: "Node JS", icon: SiNodedotjs },
  ];
  const [backend, setBackend] = useState<BackendInterface>(backends[0]);

  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open backends menu</span>
        <backend.icon />{" "}
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {backends.map((backendOption: BackendInterface) => (
          <MenuItem>
            <a
              onClick={() => setBackend(backendOption)}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
            >
              {backendOption.label}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default BackendSwitch;
