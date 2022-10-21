import { createContext, useContext } from "react";
import { api } from "../services/axios";
import { toast } from "react-toastify";
import { AuthContext } from "./UserContext";

export const TechsContext = createContext({});

function TechsProvider({ children }) {
  const { setTechLoading, CloseModal } = useContext(AuthContext);

  async function RegisterTech(data) {
    try {
      await api.post("users/techs", data);
      toast.success("Registrado com sucesso");
      setTechLoading(true);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    } finally {
      CloseModal();
    }
  }

  async function DeleteTech(id) {
    try {
      await api.delete(`users/techs/${id}`);
      toast.success("Deletado com sucesso");
      setTechLoading(true);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  }

  return (
    <TechsContext.Provider value={{ RegisterTech, DeleteTech }}>
      {children}
    </TechsContext.Provider>
  );
}

export default TechsProvider;
