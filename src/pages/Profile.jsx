import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../app/features/userSlice";
import { toast } from "react-hot-toast";
import { API } from "../main";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatchData = useDispatch();

  const handleUpdateBtn = () => {};

  const handleDeleteBtn = async () => {
    const data = await fetch(`${API}/api/user/delete-user/${currentUser._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await data.json();

    if (result.success === false) {
      return toast.error(result.message);
    }

    if (result) {
      toast.success(result.message);
      dispatchData(deleteUser(currentUser._id));
      return;
    }
  };

  const handleLogoutBtn = async () => {
    const data = await fetch(`${API}/api/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await data.json();

    if (result.success === false) {
      return toast.error(result.message);
    }

    if (result) {
      toast.success(result.message);
      dispatchData(deleteUser(currentUser._id));
      return;
    }
  };

  return (
    <>
      <Container
        backgroundImage={
          "https://i.pinimg.com/originals/75/66/e8/7566e8e3fb0767032f991e1d53e52438.jpg"
        }
        h={"100vh"}
        maxW={"container-xl"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        pos={"relative"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box w={["100%", "30rem"]} filter={"blur"}>
          <Box display={"flex"} justifyContent={"center"} w={"full"}>
            <Image
              src={currentUser.profilePic}
              rounded={"full"}
              h={"24"}
              border={"2px solid white"}
            ></Image>
          </Box>
          <form>
            <VStack>
              <Input
                mt={"6"}
                readOnly
                border={"1px solid white"}
                value={currentUser.name}
              />
              <Input
                mt={"6"}
                readOnly
                border={"1px solid white"}
                value={currentUser.email}
              />

              <Button colorScheme="green" w={"full"} mt={"8"} type="submit">
                UPDATE PROFILE
              </Button>
              <HStack>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  w={["20rem", "30rem"]}
                  mt={"10"}
                >
                  <Button cursor={"pointer"} onClick={handleDeleteBtn}>
                    Delete Profile
                  </Button>
                  <Button cursor={"pointer"} onClick={handleLogoutBtn}>
                    Logout
                  </Button>
                </Box>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
