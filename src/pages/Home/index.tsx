import { Alert, ListRenderItem, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";
import Header from "../../components/Header";
import {
  Background,
  Container,
  List,
  Nome,
  Saldo,
  Title,
  Area,
} from "./styles";
import { Historico } from "../../models/historico.model";
import HistoricoList from "../../components/HistoricoList";
import { realtime } from "../../services/firebase.service";
import { format } from "date-fns";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "../../components/DatePicker";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home = ({ navigation }: Props) => {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [saldo, setSaldo] = useState(0);
  const authContext = useContext(AuthContext);
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const renderItem: ListRenderItem<Historico> = ({ item }) => (
    <HistoricoList data={item} deleteItem={handleDelete} />
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
        .equalTo(format(newDate, "dd/MM/yyyy"))
        .limitToLast(10)
        .on("value", (snapshot) => {
          setHistorico([]);
          snapshot.forEach((item) => {
            let hist: Historico = {
              key: item.key!,
              tipo: item.val().tipo,
              valor: item.val().valor,
              date: item.val().date,
            };
            setHistorico((oldHistorico) => [...oldHistorico, hist].reverse());
          });
        });
    }
  }, [newDate]);

  const handleDelete = (item: Historico) => {
    Alert.alert(
      "Cuidado Atenção",
      `Você deseja excluir ${item.tipo} - Valor ${item.valor}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleDeleteSuccess(item),
        },
      ]
    );
  };

  const handleDeleteSuccess = async (item: Historico) => {
    if (authContext.user) {
      await realtime
        .ref("historico")
        .child(authContext.user.uid)
        .child(item.key)
        .remove();

      let saldoAtual = saldo;
      item.tipo === "despesa"
        ? (saldoAtual += item.valor)
        : (saldoAtual += item.valor);

      await realtime
        .ref("users")
        .child(authContext.user.uid)
        .child("saldo")
        .set(saldoAtual);
    }
  };

  const handleShowPicker = () => {
    setShow(true);
  };

  const handleClosePicker = () => {
    setShow(false);
  };

  const handleChangePicker = (date: Date) => {
    setShow(Platform.OS === "ios");
    setNewDate(date);
  };

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{authContext.user?.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2)}</Saldo>
      </Container>
      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Ionicons name="calendar" size={32} color="#FFF" />
        </TouchableOpacity>
      </Area>

      <Title>Ultimas movimentações</Title>

      <List data={historico} keyExtractor={keyItem} renderItem={renderItem} />

      {show && (
        <DatePicker
          onClose={handleClosePicker}
          date={newDate}
          onChangeDate={handleChangePicker}
        />
      )}
    </Background>
  );
};

export default Home;
