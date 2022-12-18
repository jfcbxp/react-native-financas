import { useContext } from "react";
import { AuthContext } from "../contexts/auth.provider";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
  const authContext = useContext(AuthContext);
  return authContext.user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
