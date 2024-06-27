import { Box, Button, Container, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailuer,
  signInStart,
  signInSuccess,
} from "../app/features/userSlice";
import GoogleBtn from "../components/GoogleBtn";
import { API } from "../main";

function SignIn() {
  const [formData, setFormData] = useState({});

  const navigater = useNavigate();

  const dispatchData = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmite = async (e) => {
    e.preventDefault();
    dispatchData(signInStart(true));
    const data = await fetch(`${API}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await data.json();

    if (result.success === false) {
      dispatchData(signInFailuer(true));
      return toast.error(result.message, {
        duration: 4000,
        style: { borderRadius: "10px" },
      });
    }

    if (result) {
      toast.success("User Successfully Login", {
        duration: 4000,
        style: { borderRadius: "10px" },
      });
      dispatchData(signInSuccess(result));
      navigater("/");
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
          <form onSubmit={handleSubmite}>
            <VStack>
              <Input
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder={"Email"}
                mt={"6"}
                required
                shadow={"1px 10px 2px rgba(20,0,0,0.2)"}
                border={"1px solid white"}
              />
              <Input
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder={"Password"}
                mt={"6"}
                required
                shadow={"1px 10px 2px rgba(20,0,0,0.2)"}
                border={"1px solid white"}
              />

              <Button
                colorScheme="green"
                w={"full"}
                mt={"8"}
                type="submit"
                isDisabled={loading}
              >
                {loading ? "LOADING.." : "SIGN IN"}
              </Button>
              <GoogleBtn />
              <Box mt={"10"} display={"flex"}>
                New member{" "}
                <Link to={"/sign-up"}>
                  <Box cursor={"pointer"}> -SIGN UP</Box>
                </Link>
              </Box>
            </VStack>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default SignIn;
