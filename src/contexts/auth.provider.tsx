import { createContext, useState } from "react";
import { User } from "../models/user.model";

export const AuthContext = createContext<User>({} as User);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({ nome: "", uuid: "" });
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
