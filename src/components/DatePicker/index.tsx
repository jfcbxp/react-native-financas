import { Platform, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Container, Header } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  date: Date;
  onClose(): void;
  onChangeDate(date: Date): void;
};

const DatePicker = (props: Props) => {
  const [dateNow, setDateNow] = useState(new Date(props.date));
  return (
    <Container>
      {Platform.OS === "ios" && (
        <Header>
          <TouchableOpacity onPress={props.onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}
      <DateTimePicker
        value={dateNow}
        mode="date"
        display="default"
        onChange={(e, d) => {
          const currentDate = d || dateNow;
          setDateNow(currentDate);
          props.onChangeDate(currentDate);
        }}
        style={{ backgroundColor: "white" }}
      />
    </Container>
  );
};

export default DatePicker;
