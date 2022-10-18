import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function LoadUser() {
      const token = localStorage.getItem("@KenzieHub:token");

      if (token) {
        try {
          const { data } = await api.get("profile");
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }
    LoadUser();
  }, []);

  async function Login(data) {
    try {
      const response = await api.post("sessions", data);

      setUser(response.data);
      window.localStorage.setItem("@KenzieHub:token", response.data.token);
      toast.success("Logado com sucesso");
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  }

  async function RegisterUser(data) {
    console.log(data);

    try {
      const response = await api.post("users", data);
      console.log(response);
      toast.success("Registrado com sucesso");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  }

  return (
    <AuthContext.Provider
      value={{ Login, user, setUser, loading, RegisterUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
