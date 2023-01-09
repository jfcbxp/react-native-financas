import { Button, ListRenderItem, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";
import Header from "../../components/Header";
import { Background, Container, List, Nome, Saldo, Title } from "./styles";
import { Historico } from "../../models/historico.model";
import HistoricoList from "../../components/HistoricoList";
import { realtime } from "../../services/firebase.service";
import { format } from "date-fns";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home = ({ navigation }: Props) => {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [saldo, setSaldo] = useState(0);
  const authContext = useContext(AuthContext);

  const renderItem: ListRenderItem<Historico> = ({ item }) => (
    <HistoricoList data={item} />
  );
  const keyItem: (item: Historico) => string = (item: Historico) =>
    item.key.toString();

  useEffect(() => {
    if (authContext.user) {
      realtime
        .ref("users")
        .child(authContext.user.uid)
        .on("value", (snapshot) => {
          setSaldo(parseFloat(snapshot.val().saldo));
        });

      realtime
        .ref("historico")
        .child(authContext.user.uid)
        .orderByChild("date")
        .equalTo(format(new Date(), "dd/MM/yy"))
        .limitToLast(10)
        .on("value", (snapshot) => {
          setHistorico([]);
          snapshot.forEach((item) => {
            let hist: Historico = {
              key: item.key!,
              tipo: item.val().tipo,
              valor: item.val().valor,
            };
            setHistorico((oldHistorico) => [...oldHistorico, hist].reverse());
          });
        });
    }
  }, []);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{authContext.user?.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2)}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List data={historico} keyExtractor={keyItem} renderItem={renderItem} />

      <Button title="Deslogar" onPress={() => authContext.signOut()} />
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({});
