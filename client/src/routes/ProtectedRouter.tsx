import { SpinnerCustom } from "@/components/ui/spinner";
import useAuth from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SpinnerCustom />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRouter;
