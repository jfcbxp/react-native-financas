import { FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";
import { Historico } from "../../models/historico.model";

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.View`
  margin-left: 15px;
  margin-bottom: 25px;
`;

export const Nome = styled.Text`
  font-size: 19px;
  color: #fff;
  font-style: italic;
`;

export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
`;

export const Title = styled.Text`
  margin-left: 5px;
  color: #00b94a;
  margin-bottom: 10px;
`;

export const Area = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: baseline;
`;

export const List = styled.FlatList<ListRenderItem<Historico>>({
  paddingTop: 15,
  backgroundColor: "#FFF",
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  marginLeft: 8,
  marginRight: 8,
}) as unknown as typeof FlatList;
