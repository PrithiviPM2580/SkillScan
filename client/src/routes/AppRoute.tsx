import { Routes, Route } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ProtectedRouter from "./ProtectedRouter";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRouter />}>
        <Route path="/" element={<h1>Home</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
