import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { vehicle } from 'src/app/interfaces/vehicles';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

private readonly baseURL = "http://localhost:3000"

constructor(private http : HttpClient) { }

get(): Observable<vehicle[]>{
  return this.http.get<vehicle[]>(this.baseURL+'/vehicles')
}

create(newVehicle: vehicle):Observable<vehicle> {
  console.log("on service")
  return this.http.post<vehicle>(this.baseURL+'/vehicles', newVehicle)
}
}
