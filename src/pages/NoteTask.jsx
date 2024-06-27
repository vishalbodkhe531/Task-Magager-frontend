import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CartData from "../components/CartData";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { API } from "../main";

function NoteTask() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { selectedCardArr, pinArr } = useSelector((state) => state.user);

  const [formdata, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleModelSubmite = async (e) => {
    e.preventDefault();

    const data = await fetch(`${API}/api/task/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify(formdata),
    });
  };

  const handleSelectedDeleteBtn = async () => {
    const data = await fetch(`${API}/api/task/selected-task-delete`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify(selectedCardArr),
    });
  };

  // const handleSelectedDeleteBtn = async () => {
  //   const data = await fetch(`/api/task/recycle-bin-checkMany`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //     body: JSON.stringify(selectedCardArr),
  //   });
  // };

  //SEARCH FEATURE
  const [searchInput, setSearchInput] = useState("");

  const [isSearchInput, setIsSearchInput] = useState(false);

  const handleSearchInput = async (e) => {
    setSearchInput(e.target.value);
  };

  const [searchInputArr, setSearchInputArr] = useState([]);

  const handleFindSubmite = async (e) => {
    e.preventDefault();
    setIsSearchInput(true);
    const data = await fetch(`${API}/api/task/search?title=${searchInput}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await data.json();
    setSearchInputArr(result);
  };
  return (
    <>
      <Container
        h={"100vh"}
        maxW={"container-2xl"}
        backgroundImage={"https://wallpapercave.com/wp/wp7901310.jpg"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        opacity="0.6"
      >
        {" "}
      </Container>
      <Container
        pos={"absolute"}
        top={"20%"}
        left={"50%"}
        transform={"translate(-50%,-50%)"}
        display={"flex"}
        h={"30vh"}
        mt={"4em"}
        justifyContent={"center"}
      >
        <VStack>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              onClick={onOpen}
              fontSize={["1rem", "2rem"]}
              zIndex={"overlay"}
              pos={"relative"}
            >
              Create Task
            </Button>
            <Box pos={"absolute"} right={"5"}>
              <MdDeleteForever
                size={"1.50em"}
                onClick={handleSelectedDeleteBtn}
                cursor={"pointer"}
              />
            </Box>
          </Box>
          <Box w={["20rem", "100%"]} mt={"5"}>
            <form onSubmit={handleFindSubmite}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Input
                  borderWidth={"2px"}
                  value={searchInput}
                  w={["30", "28rem"]}
                  h={["2rem", "2.50rem"]}
                  onChange={handleSearchInput}
                />
                <Button ml={"2"} type="submit" fontSize={["0.80rem", "1rem"]}>
                  Search
                </Button>
              </Box>
            </form>
          </Box>
        </VStack>

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
                    placeholder="First name"
                    onChange={handleInputChange}
                    name="title"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Descriptione</FormLabel>
                  <Input
                    placeholder=""
                    h={"5rem"}
                    name="descriptione"
                    onChange={handleInputChange}
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
      </Container>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        w={["100%", "80%"]}
        flexWrap={"wrap"}
        p={"0"}
        pos={"absolute"}
        top={["35%", "60%"]}
        left={"50%"}
        transform={["translate(-50%,0%)", "translate(-50%,-50%)"]}
      >
        {isSearchInput ? (
          searchInputArr.map((cartItem) => (
            <Cart
              key={cartItem._id}
              cartId={cartItem._id}
              cartTitle={cartItem.title}
              cartDesc={cartItem.descriptione}
            />
          ))
        ) : (
          <CartData />
        )}
      </Box>
    </>
  );
}

export default NoteTask;
