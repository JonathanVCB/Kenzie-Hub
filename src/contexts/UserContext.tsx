import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/axios";

interface iUserProviderProps {
  children: ReactNode;
}

export interface iLoginProps {
  email: string;
  password: string;
}
export interface iRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  contact: string;
  course_module: string;
  module?: string;
}

interface iUser {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  techs: iTechs[];
  token: string;
}
export interface iTechs {
  id: string;
  title: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface iUserValues {
  Login: (user: iLoginProps) => void;
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
  loading: boolean;
  RegisterUser: (data: iRegisterProps) => void;
  techs: iTechs[];
  showModal: boolean;
  ModalShow: () => void;
  CloseModal: () => void;
  setTechLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: () => void;
}

export const AuthContext = createContext<iUserValues>({} as iUserValues);

function UserProvider({ children }: iUserProviderProps) {
  const [user, setUser] = useState<iUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [techs, setTechs] = useState<iTechs[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [techLoading, setTechLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function LoadUser(): Promise<void> {
      const token = localStorage.getItem("@KenzieHub:token");
      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;
          const { data } = await api.get<iUser>("profile");
          setUser(data);

          setTechs(data.techs);
        } catch (error) {
          console.error(error);
          window.localStorage.clear();
        } finally {
          setTechLoading(false);
        }
      }
      setLoading(false);
    }
    LoadUser();
  }, [techLoading]);

  function isLogged(): void {
    const token = localStorage.getItem("@KenzieHub:token");
    if (token) {
      navigate("/home", { replace: true });
    }
  }

  async function Login(user: iLoginProps): Promise<void> {
    try {
      const { data } = await api.post<iUser>("sessions", user);

      setUser(data);
      setTechs(data.techs);

      window.localStorage.setItem("@KenzieHub:token", data.token);
      toast.success("Logado com sucesso");

      const toNavigate = location.state?.from?.pathname || "/home";
      navigate(toNavigate, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    } finally {
      setTechLoading(true);
    }
  }

  async function RegisterUser(data: iRegisterProps): Promise<void> {
    try {
      await api.post("users", data);
      toast.success("Registrado com sucesso");
      setTechLoading(true);

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  }

  function ModalShow(): void {
    setShowModal(true);
  }

  function CloseModal(): void {
    setShowModal(false);
  }

  return (
    <AuthContext.Provider
      value={{
        Login,
        user,
        setUser,
        loading,
        RegisterUser,
        techs,
        showModal,
        ModalShow,
        CloseModal,
        setTechLoading,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;
