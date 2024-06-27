import { Box, Button, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        <Box>
          <Container
            maxW={"container-2xl"}
            h={"100vh"}
            backgroundImage={
              "https://png.pngtree.com/background/20230520/original/pngtree-animated-christmas-snow-scene-for-desktop-backgrounds-free-picture-image_2676368.jpg"
            }
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            position={"relative"}
            opacity="0.6"
          ></Container>
          <Box
            backdropFilter={"blur(6px)"}
            borderRadius={"50px"}
            p={["none", "60px"]}
            pos={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%,-50%)"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text fontSize={["1.84rem", "3rem"]}>Organize it all</Text>
            <Text fontSize={["1rem", "1.50rem"]}>with Task-Maneger</Text>
            <Link to={"/note-task"}>
              <Button colorScheme="red" mt={"6"} fontSize={"12"} py={"0"}>
                Let's Go...
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box>
          <Container
            maxW={"container-2xl"}
            h={"100vh"}
            backgroundImage={
              "https://c0.wallpaperflare.com/preview/78/461/309/moleskine-journal-notebook-writing.jpg"
            }
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            position={"relative"}
            // backgroundColor={"rgba(0,0,0,10)"}
            opacity="0.5"
          ></Container>
          <Box
            pos={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%,-50%)"}
            // bg={"red"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text fontSize={["1.84rem", "3rem"]}>Organize it all</Text>
            <Text fontSize={["1rem", "1.50rem"]}>with Task-Maneger</Text>
            <Link to={"/sign-in"}>
              <Button colorScheme="blue" mt={"6"}>
                Get Start
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Home;
