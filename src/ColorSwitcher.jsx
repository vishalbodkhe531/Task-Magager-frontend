import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  return (
    <header>
      <IconButton
        // zIndex={"overlay"}
        // variant={"ghost"}
        color={"current"}
        pos={"fixed"}
        top={"4"}
        right={"4"}
        onClick={toggleColorMode}
        zIndex={"overlay"}
        icon={<SwitchIcon />}
        {...props}
      />
    </header>
  );
};

export default ColorSwitcher;
