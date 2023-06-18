export default interface UserData {
    id: string;
    username: string;
    scrap: number;
    registrationTime: number;
    favor: number;
    hiveEngineScrap: number;
    hiveEngineStake: number;
    minerate: number;
    attacks: number;
    claims: number;
    battle: string;
    stats: {
      dodge: number;
      crit: number;
      defense: number;
      engineering: number;
      luck: number;
      damage: number;
    };
  }