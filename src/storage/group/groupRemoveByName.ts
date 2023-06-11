import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

import { AppError } from "@utils/appError";

export async function groupRemoveByName(groupDeleted: string) {
    try {
        const storedeAll = await groupsGetAll()

        const groups = storedeAll.filter(group => group !== groupDeleted);

        await AsyncStorage.setItem(GROUP_COLLECTION , JSON.stringify(groups))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
        
    } catch (error) {
        throw error
    }
}