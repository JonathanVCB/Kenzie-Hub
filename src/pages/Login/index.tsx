import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { Form } from "../../components/Form/style";
import { DivGoRegister, DivImage, Main, SectionLogin } from "./style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext, iLoginProps } from "../../contexts/UserContext";

const LoginPage = () => {
  const { Login, isLogged } = useContext(AuthContext);

  isLogged();

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginProps>({
    resolver: yupResolver(formSchema),
  });

  return (
    <SectionLogin>
      <DivImage>
        <img src={logo} alt="logo" />
      </DivImage>
      <Main>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit(Login)}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <label htmlFor="password-">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua Senha"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <button type="submit">Entrar</button>
        </Form>
        <DivGoRegister>
          <p>Ainda não possui uma conta?</p>
          <Link to="/register">Cadastre-se</Link>
        </DivGoRegister>
      </Main>
    </SectionLogin>
  );
};

export default LoginPage;
