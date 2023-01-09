import React from "react";
import { Historico } from "../../models/historico.model";
import { Container, Tipo, IconView, TipoText, ValorText } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native";
type Props = {
  data: Historico;
  deleteItem(item: Historico): void;
};

const HistoricoList = (props: Props) => {
  return (
    <TouchableWithoutFeedback onLongPress={() => props.deleteItem(props.data)}>
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
        <ValorText>
          R$ {props.data.valor} - {props.data.date}
        </ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HistoricoList;
