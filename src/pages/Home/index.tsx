import { Button, FlatList, ListRenderItem, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";
import Header from "../../components/Header";
import { Background, Container, List, Nome, Saldo, Title } from "./styles";
import { Historico } from "../../models/historico.model";
import HistoricoList from "../../components/HistoricoList";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home = ({ navigation }: Props) => {
  const [historico, setHistorico] = useState<Historico[]>([
    { key: "1", tipo: "receita", valor: 1200 },
    { key: "2", tipo: "despesa", valor: 200 },
    { key: "3", tipo: "receita", valor: 40 },
    { key: "4", tipo: "receita", valor: 89.62 },
    { key: "5", tipo: "despesa", valor: 500 },
    { key: "6", tipo: "despesa", valor: 310 },
  ]);
  const authContext = useContext(AuthContext);

  const renderItem: ListRenderItem<Historico> = ({ item }) => (
    <HistoricoList data={item} />
  );
  const keyItem: (item: Historico) => string = (item: Historico) =>
    item.key.toString();

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{authContext.user?.nome}</Nome>
        <Saldo>R$ 123,00</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List data={historico} keyExtractor={keyItem} renderItem={renderItem} />

      <Button title="Deslogar" onPress={() => authContext.signOut()} />
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({});
