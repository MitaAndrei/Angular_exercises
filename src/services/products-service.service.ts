import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = 'https://localhost:44326/api/Products'
  constructor(private http:HttpClient) { }
  
  GetAllProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL+"/get-all");
    
  }
  
  CreateProduct(product : Product) : Observable<Product> {
    return this.http.post<Product>(this.apiURL+"/create", product);
  }
  
  DeleteProduct(id?: string) : Observable<any> {
    return this.http.delete<Product>(this.apiURL+`/delete/${id}`);
  }
  
  UpdateProduct(product : Product) : Observable<any> {
    return this.http.put<Product>(this.apiURL+`/edit/${product.id}`, product);
  }
  
  SearchProduct(input: string) : Observable<any> {
    if (input){
      return this.http.get<Product>(this.apiURL+`/get-by-keyword/${input}`);}
      return this.GetAllProducts()
    }
    
    searchInput(searchInput : Observable<string>) : Observable<any>{
      return searchInput.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(term => this.SearchProduct(term))
      )
    }

  GetMostRecentProduct() : Observable<any> {
    return this.http.get<Product>(this.apiURL+`/get-most-recent-product`);
  }

  SortByRatingAsc() : Observable<any> {
    let ascending : boolean = true;
    return this.http.get<Product>(this.apiURL+`/sort-by-avg-rating/${ascending}`);
  }

  SortByRatingDesc() : Observable<any> {
    let ascending : boolean = false;
    return this.http.get<Product>(this.apiURL+`/sort-by-avg-rating/${ascending}`);
  }

}
