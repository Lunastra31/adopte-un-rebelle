import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Starship} from "../models/starship";

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  private url: string = "http://localhost:8080/";
  private endPoint: string = "starship/";
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


}
