import { DivBack, MainReg, SectionRegister } from "./style";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { Form } from "../../components/Form/style";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext, iRegisterProps } from "../../contexts/UserContext";

const RegisterPage = () => {
  const { RegisterUser } = useContext(AuthContext);

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Deve conter 8 digitos, 1 Letra maiuscula, 1 numero e 1 caracter especial"
      ),
    confirmPassword: yup.string().required("Confirmar senha obrigatória"),
    bio: yup.string().required("Bio obrigatória"),
    contact: yup.string().required("Bio obrigatória"),
    course_module: yup.string().required("Módulo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterProps>({
    resolver: yupResolver(formSchema),
  });

  return (
    <SectionRegister>
      <DivBack>
        <img src={logo} alt="logo" />
        <Link to="/login">Voltar</Link>
      </DivBack>
      <MainReg>
        <h1>Crie sua conta</h1>
        <span>Rapido e grátis, vamos nessa</span>
        <Form onSubmit={handleSubmit(RegisterUser)}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Digite aqui seu nome"
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite aqui seu email"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Digite aqui sua senha novamente"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}

          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="text"
            placeholder="Fale sobre você"
            {...register("bio")}
          />
          {errors.bio && <span>{errors.bio.message}</span>}

          <label htmlFor="contact">Contato</label>
          <input
            id="contact"
            type="text"
            placeholder="Opção de contato"
            {...register("contact")}
          />
          {errors.contact && <span>{errors.contact.message}</span>}

          <label htmlFor="module">Selecionar módulo</label>
          <select id="module" {...register("course_module")}>
            <option value="Primeiro Módulo">Primeiro Módulo</option>
            <option value="Segundo Módulo">Segundo Módulo</option>
            <option value="Terceiro Módulo">Terceiro Módulo</option>
          </select>
          {errors.module && <span>{errors.module.message}</span>}

          <button type="submit">Cadastrar</button>
        </Form>
      </MainReg>
    </SectionRegister>
  );
};
export default RegisterPage;
