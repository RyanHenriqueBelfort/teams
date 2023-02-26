import { useState } from 'react'
import { FlatList } from "react-native";

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList } from "./styles";

export function Players() {
    const [team, setTeam] = useState('Time A')
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="Adicone a galera e sapare os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <FlatList
        data={["Time A", "Time B"]}
        keyExtractor={(key) => key}
        renderItem={({ item }) =>
         <Filter 
            title={item} 
            isActive={item === team}
            onPress={() => setTeam(item)}
         />
        }
        horizontal
      />
    </Container>
  );
}
