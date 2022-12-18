import { createContext, useState } from "react";
import { User } from "../models/user.model";
import { firebaseAuth, realtime } from "../services/firebase.service";

type AuthContextProps = {
  user: User | undefined;
  signUp(_email: string, _password: string, _nome: string): Promise<void>;
};

const defaultState = {
  user: undefined,
  signUp: async () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  const signUp = async (_email: string, _password: string, _nome: string) => {
    firebaseAuth
      .createUserWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        result.user && (await _userRegister(result.user.uid, _email, _nome));
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("informe uma senha mais forte");
        }
        if (error.code === "auth/invalid-email") {
          alert("email invalido.");
        }
      });
  };

  const _userRegister = async (_uid: string, _email: string, _nome: string) => {
    realtime
      .ref("users")
      .child(_uid)
      .set({
        nome: _nome,
        saldo: 0,
      })
      .then(() => {
        setUser({ uid: _uid, nome: _nome, email: _email });
      });
  };

  return (
    <AuthContext.Provider value={{ user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
