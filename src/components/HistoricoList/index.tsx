import React from "react";
import { Historico } from "../../models/historico.model";
import { Container, Tipo, IconView, TipoText, ValorText } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
type Props = {
  data: Historico;
};

const HistoricoList = (props: Props) => {
  return (
    <Container>
      <Tipo>
        <IconView tipo={props.data.tipo}>
          <Ionicons
            name={props.data.tipo === "despesa" ? "arrow-down" : "arrow-up"}
            size={32}
            color="#FFF"
          />
          <TipoText>{props.data.tipo}</TipoText>
        </IconView>
      </Tipo>
      <ValorText>R$ {props.data.valor}</ValorText>
    </Container>
  );
};

export default HistoricoList;
