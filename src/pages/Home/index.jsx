import logo from "../../assets/Logo.png";
import { Link, Navigate } from "react-router-dom";
import { DivBio, DivMessage, Header } from "./style";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  console.log(user);

  if (loading) {
    return null;
  }

  function Clear() {
    window.localStorage.clear();
  }

  return (
    <>
      {user ? (
        <>
          <Header>
            <img src={logo} alt="logo" />
            <Link onClick={Clear} to="/login">
              Sair
            </Link>
          </Header>
          <DivBio>
            <h1>Olá, {user.name}</h1>
            <p>{user.course_module}</p>
          </DivBio>
          <DivMessage>
            <h2>Que pena! Estamos em desenvolvimento :(</h2>
            <p>
              Nossa aplicação está em desenvolvimento, em breve teremos
              novidades
            </p>
          </DivMessage>
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default HomePage;
