import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useBackend, useTheme } from "../../context/index";
import type { BackendInterface } from "../../types/interfaces";
import { availableBackends } from "../../types/constants";
import { getDropdownStyles } from "../../styles/dropdown";

const BackendSwitch = () => {
  const { backend, setBackend } = useBackend();
  const { isDarkMode } = useTheme();
  const styles = getDropdownStyles(isDarkMode);
  const Icon = backend.icon;

  return (
    <Menu as="div" className={styles.wrapper}>
      <MenuButton disabled className={styles.button}>
        <Icon className={styles.itemIcon} />
        <span>{backend.name}</span>
      </MenuButton>

      <MenuItems
        transition
        className={`${styles.items} ${styles.itemsTransition}`}
      >
        {availableBackends.map((opt: BackendInterface) => {
          const OptIcon = opt.icon;
          return (
            <MenuItem key={opt.name}>
              <button onClick={() => setBackend(opt)} className={styles.item}>
                <OptIcon className={styles.itemIcon} />
                {opt.name}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default BackendSwitch;
