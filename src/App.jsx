import { Button, Drawer } from "@chakra-ui/react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NoteTask from "./pages/NoteTask";
import CartData from "./components/CartData";
import RecycleBin from "./pages/RecycleBin";
import RecycleData from "./components/RecycleData";

function App() {
  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/note-task" element={<NoteTask />} />
          <Route path="/allTask" element={<CartData />} />
          <Route path="/recycle-bin" element={<RecycleData />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
