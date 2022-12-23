import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";
import {
  Container,
  Nome,
  NewLink,
  NewText,
  Logout,
  LogoutText,
} from "./styles";

interface Props extends NativeStackScreenProps<RootStackParamList, "Profile"> {}

const Profile = ({ navigation }: Props) => {
  const authContext = useContext(AuthContext);

  return (
    <Container>
      <Nome>{authContext.user && authContext.user.nome}</Nome>
      <NewLink onPress={() => navigation.navigate("New")}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout onPress={() => authContext.signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
