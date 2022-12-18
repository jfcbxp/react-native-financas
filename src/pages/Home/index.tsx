import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home = ({ navigation }: Props) => {
  const authContext = useContext(AuthContext);

  return (
    <View>
      <Text>Home</Text>
      <Text>Bem Vindo! {authContext.user?.nome}</Text>
      <Button title="Deslogar" onPress={() => authContext.signOut()} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
