import { StarshipStatus } from "./enums/starship-status";
import { StarshipType } from "./enums/starship-type";
import { Pilot } from "./pilot";

export interface Starship {

    name: string;

    starshipType: StarshipType;

    starshipStatus: StarshipStatus;

    pilot: Pilot;
}
