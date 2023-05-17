import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/appError";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string){
    try {
        const storedGroups = await groupsGetAll();

        const groupsAlreadyExists = storedGroups.includes(newGroup)

        if(groupsAlreadyExists){
            throw new AppError('Já existe um grupo já cadastrado com esse nome')
        }

        const storage = JSON.stringify([...storedGroups, newGroup])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)

    } catch (error) {
        throw Error;    
    }
}