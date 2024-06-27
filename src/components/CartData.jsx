import { Box, Container, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Cart from "../pages/Cart";
import { useDispatch } from "react-redux";
import RecycleBin from "../pages/RecycleBin";
import { API } from "../main";

function CartData() {
  const [allTaskData, setAllTaskData] = useState([]);

  useEffect(() => {
    const data = fetch(`${API}/api/task/allTasks`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setAllTaskData(res));
  }, [allTaskData]);

  const dispatchData = useDispatch();

  return (
    <Container
      maxW={["100%", "container-2xl"]}
      h={"30rem"}
      scrollBehavior={"smooth"}
      overflowY={"scroll"}
    >
      <HStack
        w={"full"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {allTaskData.map((cartItem) => {
          if (cartItem.isPinTask) {
            return (
              <Cart
                key={cartItem._id}
                cartId={cartItem._id}
                cartTitle={cartItem.title}
                cartDesc={cartItem.descriptione}
                isPin={true}
              />
            );
          }
        })}
      </HStack>
      <HStack
        w={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {allTaskData.map((cartItem) => {
          if (!cartItem.isPinTask && !cartItem.isDeleted) {
            return (
              <Cart
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
  );
}

export default CartData;
