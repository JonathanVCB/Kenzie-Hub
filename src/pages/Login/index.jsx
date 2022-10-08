import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { Form } from "../../components/Form/style";
import { DivGoRegister, DivImage, Main, SectionLogin } from "./style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/axios";
import { toast } from "react-toastify";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        "Deve conter 8 digitos, 1 Letra maiuscula, 1 numero e 1 caracter especial"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function Login(data) {
    api
      .post("sessions", data)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        window.localStorage.setItem("@KenzieHub:token", res.data.token);
        toast.success("Logado com sucesso");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo deu errado");
      });
  }
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
