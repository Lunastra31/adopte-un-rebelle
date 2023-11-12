import { PilotBreed } from "./enums/pilot-breed";
import { PilotRank } from "./enums/pilot-rank";
import { PilotStatus } from "./enums/pilot-status";
import { Mission } from "./mission";
import { Starship } from "./starship";

export interface Pilot {
    id : number | null;
    name: string;
    surname: string;
    isTrainee: boolean;
    pilotBreed:PilotBreed;
    age: number;
    flightHours: number;
    endedMissionCount: number;
    pilotStatus:PilotStatus;
    pilotRank:PilotRank;
    starship:Starship | null;
    mission:Mission | null;
}
