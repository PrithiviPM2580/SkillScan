import { Routes, Route } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import HomePage from "@/components/HomePage";
import Interview from "@/features/interview/pages/Interview";
import ProtectedRouter from "./ProtectedRouter";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRouter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/interview/:interviewId" element={<Interview />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
