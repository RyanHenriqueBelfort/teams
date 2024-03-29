import { useCallback, useState } from "react";

import { FlatList } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { StatusBar } from "expo-status-bar";
import { Container } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>(["Amigos", "Grupo da zueira"]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group})
  }

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
        // contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre a sua primeira turma" />
        )}
      />
      <Button title="Criar nova tumar" onPress={handleNewGroup} />
    </Container>
  );
}
