import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mission} from "../models/mission";

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private url: string = "http://localhost:8080/";
  private endPoint: string = "mission/";
  constructor(private httpClient : HttpClient) { }

  public getAllMissions() : Observable<Mission[]> {
    return this.httpClient.get<Mission[]>(this.url + this.endPoint);
  }

  public addMission(mission: Mission): Observable<Mission> {
    return this.httpClient.post<Mission>(this.url + this.endPoint, mission);
  }

  public deleteMission(id: number) : Observable<Mission> {
    return this.httpClient.delete<Mission>(this.url + this.endPoint + id)
  }
}
