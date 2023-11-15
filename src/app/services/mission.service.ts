import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Mission} from "../models/mission";
import {Pilot} from "../models/pilot";
import {Starship} from "../models/starship";

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private url: string = "http://localhost:8080/";
  private endPoint: string = "mission/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient : HttpClient) { }

  public getAllMissions() : Observable<Mission[]> {
    return this.httpClient.get<Mission[]>(this.url + this.endPoint);
  }

  public createMission(mission: Mission): Observable<Mission> {
    return this.httpClient.post<Mission>(this.url + this.endPoint, mission);
  }

  public affectPilot(pilots: Pilot[], missionId:number) : Observable<Mission> {
    return this.httpClient.put<Mission>(this.url + this.endPoint + "affect/" + missionId, JSON.stringify(pilots), this.httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  public deleteMission(id: number) : Observable<Mission> {
    return this.httpClient.delete<Mission>(this.url + this.endPoint + id)
  }

  public endMission(mission : Mission) : Observable<Mission> {
    return this.httpClient.put<Mission>(this.url + this.endPoint + JSON.stringify(mission), this.httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

}
