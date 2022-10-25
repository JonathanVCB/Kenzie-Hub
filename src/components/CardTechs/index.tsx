import { Card, DivDelete } from "./style";
import del from "../../assets/delete.png";
import { useContext } from "react";
import { TechsContext } from "../../contexts/TechContext";
import { iTechs } from "../../contexts/UserContext";

interface CardTechProps {
  tech: iTechs;
}

const CardTech = ({ tech }: CardTechProps) => {
  const { DeleteTech } = useContext(TechsContext);

  return (
    <Card>
      <h5>{tech.title}</h5>
      <DivDelete>
        <span>{tech.status}</span>
        <img src={del} alt="deletar" onClick={() => DeleteTech(tech.id)} />
      </DivDelete>
    </Card>
  );
};

export default CardTech;
