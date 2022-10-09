import logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { DivBio, DivMessage, Header } from "./style";

const HomePage = ({ user }) => {
  const token = localStorage.getItem("@KenzieHub:token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
  function Clear() {
    window.localStorage.clear();
  }

  return (
    <>
      <Header>
        <img src={logo} alt="logo" />
        <Link onClick={Clear} to="/login">
          Sair
        </Link>
      </Header>
      <DivBio>
        <h1>Olá, {user.user.name}</h1>
        <p>{user.user.course_module}</p>
      </DivBio>
      <DivMessage>
        <h2>Que pena! Estamos em desenvolvimento :(</h2>
        <p>
          Nossa aplicação está em desenvolvimento, em breve teremos novidades
        </p>
      </DivMessage>
    </>
  );
};

export default HomePage;
