import { Button } from "@chakra-ui/react";
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailuer,
  signInStart,
  signInSuccess,
} from "../app/features/userSlice";

function GoogleBtn() {
  const navigeter = useNavigate();

  const { loading } = useSelector((state) => state.user);
  const dispatchData = useDispatch();

  const handleGoogleBtn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    const { displayName, email, photoURL } = result.user;

    dispatchData(signInStart(true));

    const data = await fetch(`${API}/api/user/google-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        displayName,
        email,
        photoURL,
      }),
    });

    const API_Data = await data.json();

    if (API_Data.success === false) {
      dispatchData(signInFailuer(true));
      return toast.error(data.message, {
        duration: 4000,
        style: { borderRadius: "10px" },
      });
    }

    if (API_Data) {
      toast.success(`Wellcome ${API_Data.name}`, {
        duration: 4000,
        style: { borderRadius: "10px" },
      });
      navigeter("/");
      dispatchData(signInSuccess(API_Data));
      return;
    }
  };
  return (
    <>
      <Button
        colorScheme="red"
        w={"full"}
        mt={"5"}
        type="submit"
        onClick={handleGoogleBtn}
      >
        SIGN WITH GOOGLE
      </Button>
    </>
  );
}

export default GoogleBtn;
