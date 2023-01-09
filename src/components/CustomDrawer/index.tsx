import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.provider";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const CustomDrawer = (props: Props) => {
  const authContext = useContext(AuthContext);
  const nav = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("../../../assets/Logo.png")}
          style={{ width: 85, height: 85 }}
          resizeMode="contain"
        />

        <Text style={{ color: "#FFF", fontSize: 18, marginTop: 5 }}>
          Bem-vindo
        </Text>
        <Text
          style={{
            color: "#FFF",
            fontSize: 17,
            fontWeight: "bold",
            paddingBottom: 25,
          }}
        >
          {authContext.user && authContext.user.nome}
        </Text>
      </View>

      <DrawerItemList
        state={nav.getParent()}
        navigation={nav.getParent()}
        descriptors={nav.getParent()}
        {...props}
      />

      <DrawerItem
        {...props}
        label="Sair do app"
        inactiveBackgroundColor="#c62c36"
        onPress={() => authContext.signOut()}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
