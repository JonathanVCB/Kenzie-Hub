import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { DivBio, DivAdd, Header, MainContain, ListTechs } from "./style";
import { useContext } from "react";
import { AuthContext } from "../../contexts/UserContext";
import add from "../../assets/ButtonAdd.png";
import CardTech from "../../components/CardTechs";
import ModalAddTech from "../../components/Modal";

const HomePage = () => {
  const { user, techs, showModal, ModalShow } = useContext(AuthContext);

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
        <h1>Olá, {user.name}</h1>
        <p>{user.course_module}</p>
      </DivBio>
      <DivAdd>
        <h2>Tecnologias</h2>
        <button onClick={ModalShow}>
          <img src={add} alt="adcionar" />
        </button>
      </DivAdd>
      <MainContain>
        <ListTechs>
          {techs?.map((tech) => (
            <CardTech key={tech.id} tech={tech} />
          ))}
        </ListTechs>
        {showModal && <ModalAddTech />}
      </MainContain>
    </>
  );
};

export default HomePage;
