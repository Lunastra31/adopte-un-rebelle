import { MissionStatus } from "./enums/mission-status";
import { MissionType } from "./enums/mission-type";
import { Pilot } from "./pilot";

export interface Mission {
  id: number;
    name: string;
    selectPilotCount: number;
    missionType: MissionType;
    pilots: Pilot[] | [];
    flightHours: number;
    missionStatus: MissionStatus;
}
