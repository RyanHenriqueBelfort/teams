import { useState } from 'react'
import { FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

type RouteParams = {
  group: string
}

export function Players() {
    const [team, setTeam] = useState('Time A')
    const [player, setPlayer] = useState([])

    const route = useRoute()
    const { group } = route.params as RouteParams
  return (
    <Container>
      <Header showBackButton />
    
      <Highlight
        title={group}
        subtitle="Adicone a galera e sapare os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
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
        <NumberOfPlayers>
          {player.length}
        </NumberOfPlayers>
      </HeaderList>
      <FlatList 
        data={player}
        keyExtractor={(key) => key}
        renderItem={({item}) => 
        <PlayerCard 
          name={item}
          onRemove={() => {}}
        />
        }
        ListEmptyComponent={() => (
          <ListEmpty 
            message="Não é há pessoas nesse time."
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          player.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title='Remover Turma'
        type='SECONDARY'
      />
    </Container>
  );
}
