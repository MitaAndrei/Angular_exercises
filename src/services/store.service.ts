import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiURL = 'https://localhost:44326/api/Store'

  constructor(private http:HttpClient) { }

  GetAllStores() : Observable<Store[]> {
    return this.http.get<Store[]>(this.apiURL);
  }

  CreateStore(store : Store) : Observable<Store> {
    return this.http.post<Store>(this.apiURL, store);
  }

  DeleteStore(id?: string) : Observable<any> {
    return this.http.delete<Store>(this.apiURL+`/${id}`);
  }

  UpdateStore(store : Store) : Observable<any> {
    return this.http.put<Store>(this.apiURL+`/edit/${store.id}`, store )
  }

  SearchStore(input: string) : Observable<any> {
    return this.http.get<Store>(this.apiURL+`/search/${input}`)
  }

  SortByIncome(): Observable<any>{
    return this.http.get<Store>(this.apiURL + `/get-by-sorted-income`);
  }

  GetOldestStore(): Observable<any> {
    return this.http.get<Store>(this.apiURL + `/get-oldest-store`);
  }
}
