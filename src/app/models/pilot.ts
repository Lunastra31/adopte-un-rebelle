import { PilotBreed } from "./enums/pilot-breed";
import { PilotRank } from "./enums/pilot-rank";
import { PilotStatus } from "./enums/pilot-status";
import { Mission } from "./mission";
import { Starship } from "./starship";

export interface Pilot {
    name:string;
    surname:string;
    pilotBreed:PilotBreed;
    insDate: Date;
    age: number;
    pilotStatus:PilotStatus;
    pilotRank:PilotRank;
    starship:Starship;
    mission:Mission;
}
