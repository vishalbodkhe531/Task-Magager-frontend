import React, { useState } from "react";
import { LuPin } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import checkPng from "../assets/right.png";
import { useDispatch } from "react-redux";
import { IoMdMore } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { LuPinOff } from "react-icons/lu";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { removeSelecteCard, selectedCardArr } from "../app/features/userSlice";
import { API } from "../main";

function Cart({ cartId, cartTitle, cartDesc, isPin }) {
  const dispatchData = useDispatch();

  // States
  const [checkBg, setCheckBg] = useState(false);
  const [chekedArr, setchekedArr] = useState([]);
  const [isActivePin, setIsActivePin] = useState(false);
  const [openOption, SetOpenOption] = useState(false);

  // HandleBTN's

  const handleDeleteBtn = async () => {
    const data = await fetch(`${API}/api/task/recycle-bin-check/${cartId}`, {
      method: "GET",
      credentials: "include",
    });
  };

  const handlePINBtn = async () => {
    setIsActivePin(true);
    const data = await fetch(`${API}/api/task/pin-task/${cartId}`, {
      method: "GET",
      credentials: "include",
    });
  };

  const handleCheckBtn = async () => {
    setCheckBg(true);
    setchekedArr(cartId);
    dispatchData(selectedCardArr(cartId));
    if (checkBg) {
      setCheckBg(false);
      dispatchData(removeSelecteCard(cartId));
    }
  };

  // MODEL
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [formTitle, setFormTitle] = useState(cartTitle);
  const [formDesc, setFormDesc] = useState(cartDesc);

  const handleModelSubmite = async (e) => {
    e.preventDefault();
    const data = await fetch(`${API}/api/task/update-task/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title: formTitle, descriptione: formDesc }),
    });

    const result = await data.json();

    console.log(result);
  };

  return (
    <>
      <Box
        w={["10rem", "20rem"]}
        display={"flex"}
        justifyContent={"center"}
        p={"2"}
      >
        <Card
          backdropFilter={"blur(16px)"}
          bg={"transparent"}
          h={["10rem", "17rem"]}
          margin={["0 1rem 2rem 1rem", "0 2rem 5rem 2rem"]}
          py={["2", "1"]}
          w={["10rem", "18rem"]}
          shadow={"3px 3px 25px 3px white"}
        >
          <CardHeader
            display={"flex"}
            justifyContent={"space-between"}
            p={["0", "3"]}
          >
            <Heading size="md" display={["none", "flex"]}>
              Client Report
            </Heading>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              mr={"2"}
              w={["10rem", "5rem"]}
            >
              <Box>
                {checkBg ? (
                  <Image
                    src={checkPng}
                    h={"22px"}
                    pos={"absolute"}
                    left={["5", "10rem"]}
                    top={["1", "0.80rem"]}
                    cursor={"pointer"}
                    onClick={handleCheckBtn}
                  />
                ) : null}
                <Box display={"flex"} ml={"4"}>
                  <RiCheckboxBlankCircleLine
                    pos={"relateve"}
                    size={"1.20em"}
                    cursor={"pointer"}
                    onClick={handleCheckBtn}
                  />
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                {openOption ? (
                  <RxCross1
                    size={"1.20em"}
                    cursor={"pointer"}
                    onClick={() => SetOpenOption(false)}
                  />
                ) : (
                  // <Box >
                  <IoMdMore
                    size={"1.30em"}
                    onClick={() => SetOpenOption(true)}
                    cursor={"pointer"}
                  />
                  // </Box>
                )}
              </Box>
            </Box>
          </CardHeader>

          <CardBody>
            <div style={openOption ? { display: "flex" } : { display: "none" }}>
              <Box pos={"absolute"} right={["-1", "1"]} top={["2em", "3.50em"]}>
                <Box display={"flex"} mt={["0", "2"]}>
                  {isPin ? (
                    <Button size={"1"} onClick={handlePINBtn} mt={"1"}>
                      <LuPinOff size={"1em"} cursor={"pointer"} />
                      <Box ml={"2"} fontSize={["12", "15"]}>
                        PIN
                      </Box>
                    </Button>
                  ) : (
                    <Button size={"1"} onClick={handlePINBtn} mt={"1"}>
                      <LuPin size={"1em"} cursor={"pointer"} />
                      <Box ml={"2"} fontSize={["12", "15"]}>
                        PIN
                      </Box>
                    </Button>
                  )}
                </Box>
                <Box
                  display={"flex"}
                  mt={["0.10em", "2"]}
                  onClick={handleDeleteBtn}
                >
                  <Button size={"1"} mt={"1"} fontSize={("4", "15")}>
                    <MdDelete size={"1em"} cursor={"pointer"} />
                    <Box ml={"2"} fontSize={["12", "15"]}>
                      Delete
                    </Box>
                  </Button>
                </Box>

                <Box display={"flex"} mt={"2"}>
                  <Button
                    size={"1"}
                    mt={["0.7px", "2"]}
                    ml={"1"}
                    onClick={onOpen}
                  >
                    <FaRegEdit size={"1em"} cursor={"pointer"} />
                    <Box ml={"2"} fontSize={["12", "15"]}>
                      Edit
                    </Box>
                  </Button>
                </Box>
              </Box>
            </div>
            <Stack divider={<StackDivider />} spacing="3">
              <Box>
                <Heading
                  fontSize={["0.70rem", "1.20rem"]}
                  textTransform="uppercase"
                  borderRadius={"5px"}
                >
                  Title
                </Heading>
                <Text pt="2" fontSize={["0.70rem", "1.10rem"]}>
                  {cartTitle}
                </Text>
              </Box>
              <Box>
                <Heading
                  textTransform="uppercase"
                  fontSize={["0.70rem", "1.20rem"]}
                  borderRadius={"5px"}
                >
                  desc
                </Heading>
                <Text pt="2" fontSize={["0.70rem", "1rem"]}>
                  {cartDesc}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleModelSubmite}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    ref={initialRef}
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    name="title"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Descriptione</FormLabel>
                  <Input
                    h={"5rem"}
                    value={formDesc}
                    name="descriptione"
                    onChange={(e) => setFormDesc(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                  type="submit"
                  // onClick={handleModelSubmite}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default Cart;
