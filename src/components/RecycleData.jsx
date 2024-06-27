import { Box, Container, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecycleBin from "../pages/RecycleBin";
import { MdDeleteForever } from "react-icons/md";
import { API } from "../main";

function RecycleData() {
  const dispatchData = useDispatch();
  const { selectedCardArr } = useSelector((state) => state.user);
  const [allTaskData, setAllTaskData] = useState([]);

  useEffect(() => {
    const data = fetch(`${API}/api/task/allTasks`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setAllTaskData(res));
  }, [allTaskData]);

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

  return (
    <>
      <Box
        h={"100vh"}
        maxW={"container-2xl"}
        backgroundImage={"https://wallpapercave.com/wp/wp7901310.jpg"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        opacity="0.6"
      >
        <Box pos={"absolute"} top={"6rem"} right={"12%"}>
          <MdDeleteForever
            size={"2em"}
            onClick={handleSelectedDeleteBtn}
            cursor={"pointer"}
          />
        </Box>
      </Box>
      <Container
        maxW={["100%", "container-2xl"]}
        h={["30rem", "43rem"]}
        scrollBehavior={"smooth"}
        overflowY={"scroll"}
        pos={"absolute"}
        top={"10rem"}
        // bg={"red"}
      >
        <HStack
          w={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {allTaskData.map((cartItem) => {
            if (cartItem.isDeleted) {
              return (
                <RecycleBin
                  key={cartItem._id}
                  cartId={cartItem._id}
                  cartTitle={cartItem.title}
                  cartDesc={cartItem.descriptione}
                />
              );
            }
          })}
        </HStack>
      </Container>
    </>
  );
}

export default RecycleData;
