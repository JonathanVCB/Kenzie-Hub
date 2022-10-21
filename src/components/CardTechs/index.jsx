import { Card, DivDelete } from "./style";
import del from "../../assets/delete.png";
import { useContext } from "react";
import { TechsContext } from "../../contexts/TechContext";

const CardTech = ({ tech }) => {
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
