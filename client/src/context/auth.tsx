import { ReactNode, createContext, useContext, useState } from "react";
import { Auth } from "../types/authTypes.types";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextProps {
  auth: Omit<Auth, "message"> | null;
  setAuth: React.Dispatch<React.SetStateAction<Omit<Auth, "message"> | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { getValue } = useLocalStorage();
  const [auth, setAuth] = useState<Omit<Auth, "message"> | null>(
    {} as Omit<Auth, "message"> | null
  );

  const [persist, setPersist] = useState<boolean>(
    getValue("persist")! || false
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export { useAuth };
