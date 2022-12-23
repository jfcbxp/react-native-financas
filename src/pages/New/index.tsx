import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { AuthContext } from "../../contexts/auth.provider";

interface Props extends NativeStackScreenProps<RootStackParamList, "New"> {}

const New = ({ navigation }: Props) => {
  const authContext = useContext(AuthContext);

  return (
    <View>
      <Text>New</Text>
      <Text>Bem Vindo! {authContext.user?.nome}</Text>
    </View>
  );
};

export default New;

const styles = StyleSheet.create({});
