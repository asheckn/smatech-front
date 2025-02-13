import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }


  //Get Single Incoming payment
  getProducts(name:any =null, categoryId:any =null, price:any =null, status:any =null, page:number = 0, size:number = 5 ):Observable<ApiResponse> {
    let params :any = {
      page: page,
      size: size
    }

    if(name){
      params["name"] = name;
    }
    if(categoryId){
      params["name"] = categoryId;
    }
    if(price){
      params["name"] = price;
    }
    if(status){
      params["name"] = status;
    }


    return this.http.get(`${environment.storeUrl}product/getProducts`,{params:params}) as Observable<ApiResponse>;
  }

  getCategories():Observable<ApiResponse> {
    return this.http.get(`${environment.storeUrl}category/getCategories`) as Observable<ApiResponse>;
  }
}
