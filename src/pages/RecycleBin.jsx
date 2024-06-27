import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeSelecteCard, selectedCardArr } from "../app/features/userSlice";
import { TbRestore } from "react-icons/tb";

import checkPng from "../assets/right.png";
import { API } from "../main";

function RecycleBin({ cartId, cartTitle, cartDesc, isPin }) {
  const [checkBg, setCheckBg] = useState(false);
  const [chekedArr, setchekedArr] = useState([]);

  const [allTaskData, setAllTaskData] = useState([]);

  const dispatchData = useDispatch();

  const handleCheckBtn = async () => {
    setCheckBg(true);
    setchekedArr(cartId);
    dispatchData(selectedCardArr(cartId));
    if (checkBg) {
      setCheckBg(false);
      dispatchData(removeSelecteCard(cartId));
    }
  };

  const handleRestoreBtn = async () => {
    const data = await fetch(`${API}/api/task/recycle-bin-check/${cartId}`, {
      method: "GET",
      credentials: "include",
    });
  };

  return (
    <Box
      w={["10rem", "20rem"]}
      display={"flex"}
      justifyContent={"center"}
      py={"4"}
    >
      <Card
        backdropFilter={"blur(26px)"}
        bg={"transparent"}
        h={["10.20rem", "17rem"]}
        margin={["0 1rem 2rem 1rem", "0 2rem 5rem 2rem"]}
        p={"2"}
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
                  left={["6", "10.30rem"]}
                  top={["1", "0.80rem"]}
                  cursor={"pointer"}
                  onClick={handleCheckBtn}
                />
              ) : null}
              <Box display={"flex"} ml={"3"}>
                <RiCheckboxBlankCircleLine
                  pos={"relateve"}
                  size={"1.20em"}
                  cursor={"pointer"}
                  onClick={handleCheckBtn}
                />
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <TbRestore
                size={"1.20em"}
                cursor={"pointer"}
                onClick={handleRestoreBtn}
              />
            </Box>
          </Box>
        </CardHeader>

        <CardBody
          display={"flex"}
          justifyContent={["center", "left"]}
          py={["4", "4"]}
        >
          <Stack divider={<StackDivider />} spacing="3">
            <Box>
              <Heading
                fontSize={["0.70rem", "1.20rem"]}
                textTransform="uppercase"
                borderRadius={"5px"}
                p={"0"}
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
    </Box>
  );
}

export default RecycleBin;
