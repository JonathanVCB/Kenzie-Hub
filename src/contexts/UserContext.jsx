import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/axios";

export const AuthContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [techs, setTechs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [techLoading, setTechLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function LoadUser() {
      const token = localStorage.getItem("@KenzieHub:token");
      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;
          const { data } = await api.get("profile");
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

  async function Login(data) {
    try {
      const response = await api.post("sessions", data);

      setUser(response.data);
      setTechs(response.data.techs);

      window.localStorage.setItem("@KenzieHub:token", response.data.token);
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

  async function RegisterUser(data) {
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

  function ModalShow() {
    setShowModal(true);
  }

  function CloseModal() {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;
