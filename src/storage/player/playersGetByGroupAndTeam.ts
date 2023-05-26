import { playersGetByGroups } from "./playersGetByGroups";

export async function playerAddByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playersGetByGroups(group);

    const player = storage.filter((player) => player.team === team);
    
    return player;
  } catch (error) {
    throw error;
  }
}
