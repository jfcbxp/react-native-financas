import {
  Alert,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";
import {
  Background,
  Input,
  PickerView,
  SubmitButton,
  SubmitText,
} from "./styles";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import { realtime } from "../../services/firebase.service";
import { format } from "date-fns";

interface Props extends NativeStackScreenProps<RootStackParamList, "New"> {}

const New = ({ navigation }: Props) => {
  const authContext = useContext(AuthContext);
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");

  const handleAdd = async () => {
    let uuid = authContext.user?.uid;

    if (!uuid) {
      alert("Não foi possivel obter o usuario logado");
      return;
    }

    let key = await realtime.ref("historico").child(uuid).push().key;

    if (!key) {
      alert(
        "Não foi possivel se comunicar com o servidor, verique a conexão com a internet."
      );
      return;
    }

    await realtime
      .ref("historico")
      .child(uuid)
      .child(key)
      .set({
        tipo: tipo,
        valor: parseFloat(valor),
        date: format(new Date(), "dd/MM/yy"),
      });

    let user = realtime.ref("users").child(uuid);
    await user.once("value").then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === "despesa"
        ? (saldo -= parseFloat(valor))
        : (saldo += parseFloat(valor));

      user.child("saldo").set(saldo);

      setValor("");
      Keyboard.dismiss();
      navigation.navigate("Home");
    });
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor))) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert("Confirmando dados", `Tipo ${tipo} - Valor: ${valor}`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Continuar",
        onPress: () => handleAdd(),
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: "center" }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />
          <PickerView>
            <Picker
              mode="dialog"
              style={{
                width: "100%",
              }}
              selectedValue={tipo}
              onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
            >
              <Picker.Item label="Receita" value="receita" />
              <Picker.Item label="Despesa" value="despesa" />
            </Picker>
          </PickerView>

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default New;
