import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Starship} from "../models/starship";
import {Pilot} from "../models/pilot";

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  private url: string = "http://localhost:8080/";
  private endPoint: string = "starship/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient : HttpClient) { }

    public getAllStarship() : Observable<Starship[]> {
    return this.httpClient.get<Starship[]>(this.url + this.endPoint);
    }

    public createStarship(starship: Starship): Observable<Starship> {
        return this.httpClient.post<Starship>(this.url + this.endPoint, starship);
    }

    public deleteStarship(id: number) : Observable<Starship> {
    return this.httpClient.delete<Starship>(this.url + this.endPoint + id)
    }

    public affectPilot(pilot: Pilot, starshipId:number) : Observable<Starship> {
      return this.httpClient.put<Starship>(this.url + this.endPoint + "affect/" + starshipId, JSON.stringify(pilot), this.httpOptions).pipe(
        catchError((err) => {
          return throwError(() => new Error(err));
        })
      )
    }

    public desaffectPilot(starshipId:number) : Observable<Starship> {
        return this.httpClient.put<Starship>(this.url + this.endPoint + "desaffect/" + starshipId, {}, this.httpOptions).pipe(
          catchError((err) => {
            return throwError(() => new Error(err));
          })
        )
    }
}
