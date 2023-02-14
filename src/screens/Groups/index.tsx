import { useState } from 'react';

import { FlatList } from 'react-native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  return (
    <Container>
      <Header showBackButton/>
      <Highlight 
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item}
          />
        )}
        // contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty  message='Cadastre a sua primeira turma'/>}
      />
    </Container>
  );
}
