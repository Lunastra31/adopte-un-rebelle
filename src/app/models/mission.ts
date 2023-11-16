import { MissionStatus } from './enums/mission-status';
import { MissionType } from './enums/mission-type';
import { Pilot } from './pilot';

export interface Mission {
  id: number | null;
  name: string;
  missionType: MissionType;
  pilots: Pilot[] | null;
  flightHours: number;
  missionStatus: MissionStatus;
}
