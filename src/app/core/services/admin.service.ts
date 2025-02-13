import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  //Get Single Incoming payment
  getProducts(name:any =null, categoryId:any =null, price:any =null, status:any =null, page:number = 0, size:number = 20 ):Observable<ApiResponse> {
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

  createProduct(queryParams: string, formData: FormData) {


    return this.http.post(`${environment.storeUrl}product/create-product?${queryParams}`, formData);
  }
}
