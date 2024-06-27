import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  HStack,
  Image,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import ColorSwitcher from "../ColorSwitcher";
import { useSelector } from "react-redux";

function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { currentUser } = useSelector((state) => state.user);

  const btnCSS = {
    variant: "ghost",
    mt: "2",
  };

  return (
    <>
      <Button
        onClick={onOpen}
        zIndex={"overlay"}
        pos={"fixed"}
        left={"4"}
        top={"4"}
        colorScheme="purple"
        p={"0"}
        w={"10"}
        h={"30"}
        borderRadius={"full"}
      >
        <BiMenuAltLeft />
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>Note-Book</DrawerHeader>
          <DrawerBody>
            <ColorSwitcher />
            <Stack>
              <VStack alignItems={"flex-start"} mt={"2"}>
                <Link to={"/"}>
                  <Button {...btnCSS} onClick={onClose}>
                    HOME
                  </Button>
                </Link>

                {currentUser ? (
                  <>
                    <Link to={"/recycle-bin"}>
                      <Button {...btnCSS} onClick={onClose}>
                        RECYCLE-BIN
                      </Button>
                    </Link>
                    <Link to={"/note-task"}>
                      <Button {...btnCSS} onClick={onClose}>
                        TASKS
                      </Button>
                    </Link>
                  </>
                ) : null}
              </VStack>
              <HStack
                pos={"absolute"}
                bottom={"10"}
                w={"full"}
                left={"0"}
                justifyContent={"space-around"}
              >
                <Link to={"/sign-in"}>
                  <Button variant={"ghost"} onClick={onClose}>
                    SIGN IN
                  </Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button variant={"ghost"} onClick={onClose}>
                    SIGN UP
                  </Button>
                </Link>
              </HStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box pos={"absolute"} right={"5"} top={"4"}>
        {currentUser ? (
          <Button
            zIndex={"overlay"}
            borderRadius={"full"}
            bg={"none"}
            _hover={"none"}
          >
            <Link to={"/profile"}>
              <Image
                src={currentUser.profilePic}
                borderRadius={"full"}
                zIndex={"overlay"}
                h={["35px", "40px"]}
              ></Image>
            </Link>
          </Button>
        ) : (
          // <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BSEPxHF0-PRxJlVMHla55wvcxWdSi8RU2g&s"></Image>
          <Link to={"/sign-in"}>
            <Button
              color={"black"}
              zIndex={"overlay"}
              colorScheme="green"
              px={"3"}
              mr={"2"}
              borderRadius={"10px"}
              fontSize={"0.80rem"}
            >
              Sign IN
            </Button>
          </Link>
        )}
      </Box>
    </>
  );
}

export default Header;
