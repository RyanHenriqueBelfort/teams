import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/appError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./playerStorageDTO";
import { playersGetByGroups } from "./playersGetByGroups";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {

    try {
        const storedPlayers = await playersGetByGroups(group)

        const playerAlreadyExists = storedPlayers.filter(player => player.name == newPlayer.name);

        if (playerAlreadyExists.length > 0) {
            throw new AppError('Essa pessoa já está adicionanda em um time aqui.');
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)

    } catch (error) {
        throw (error)
    }
}