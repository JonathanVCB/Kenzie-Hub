import { DivContainer, FormModal, HeaderModal, SectionModal } from "./style";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TechsContext } from "../../contexts/TechContext";
import { useContext } from "react";
import { AuthContext } from "../../contexts/UserContext";

const ModalAddTech = () => {
  const { RegisterTech } = useContext(TechsContext);
  const { CloseModal } = useContext(AuthContext);

  const formSchema = yup.object().shape({
    title: yup.string().required("Nome da tecnologia obrigatório"),
    status: yup.string().required("Status obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <SectionModal>
      <DivContainer>
        <HeaderModal>
          <h6>Cadastrar Tecnologia</h6>
          <button onClick={CloseModal}>X</button>
        </HeaderModal>
        <FormModal onSubmit={handleSubmit(RegisterTech)}>
          <label htmlFor="title">Nome</label>
          <input
            id="title"
            type="text"
            placeholder="Digite a tecnologia"
            {...register("title")}
          />
          {errors.title && <span>{errors.title.message}</span>}

          <label htmlFor="status">Selecionar status</label>
          <select name="status" id="status" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="INtermediário">INtermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button type="submit">Cadastrar Tecnologia</button>
        </FormModal>
      </DivContainer>
    </SectionModal>
  );
};

export default ModalAddTech;
