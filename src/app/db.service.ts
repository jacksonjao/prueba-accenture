import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbService {
private DATABASE_URL: string;
  constructor(private httpClient: HttpClient) {
    this.DATABASE_URL = 'https://prueba-accenture-588e1.firebaseio.com/';
  }

  getClient(id): Observable<Client>  {
    const path = `clients/${id}.json`;
    return this.httpClient.get<Client>(this.DATABASE_URL + path);
  }

  addClient(id, client: Client): Observable<any>  {
    const path = `clients/${id}.json`;
    return this.httpClient.patch(this.DATABASE_URL + path, client);
  }

  addApplication(id, request: LoanApplication): Observable<any>  {
    const path = `applications/${id}.json`;
    return this.httpClient.patch(this.DATABASE_URL + path, request);
  }

}
