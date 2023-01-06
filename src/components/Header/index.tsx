import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Container, ButtonMenu } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation();
  return (
    <Container>
      <ButtonMenu
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="md-menu" size={32} color="#FFF" />
      </ButtonMenu>
    </Container>
  );
};

export default Header;
