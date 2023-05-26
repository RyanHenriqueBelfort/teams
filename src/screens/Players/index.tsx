import { useState, useEffect } from 'react'
import { Alert, FlatList } from "react-native";
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
import { AppError } from '@utils/appError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroups } from '@storage/player/playersGetByGroups';
import { playerAddByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';

type RouteParams = {
  group: string
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [player, setPlayer] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const { group } = route.params as RouteParams

    async function handleAddPlayer() {
      if(newPlayerName.trim().length === 0) {
        return Alert.alert('Nova pessoa', 'Informe o nome da pessoas para adicionar'); 
      }

      const newPlayer = {
        name: newPlayerName,
        team,
      }

      try {
        await playerAddByGroup(newPlayer, group);
        setNewPlayerName('')
        fetchPlayersByTeam()
      } catch(error) {
        if(error instanceof AppError){
            Alert.alert('Nova pessoa', error.message)
        }else{
          console.log(error);
          Alert.alert('Nova pessoa', 'Não foi possivel adicionar')
        }
      }
    }

      async function fetchPlayersByTeam() {
        try {
          const playersByTeam = await playerAddByGroupAndTeam(group, team)
          setPlayer(playersByTeam)
        }catch(error) {
          Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
      }
    }

    useEffect(() => {
      fetchPlayersByTeam()
    }, [team])
    
  return (
    <Container>
      <Header showBackButton />
    
      <Highlight
        title={group}
        subtitle="Adicone a galera e sapare os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} onChangeText={setNewPlayerName} value={newPlayerName}/>

        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
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
        keyExtractor={(item) => item.name}
        renderItem={({item}) => 
        <PlayerCard 
          name={item.name}
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
