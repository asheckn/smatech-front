import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse, AuthResponse, UserData} from '../models';
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

  addCategory(name:any,formData: FormData){
    return this.http.post(`${environment.storeUrl}category/add-category?name=${name}`,formData);
  }

  editCategory(categoryId: any, name: any, formData: FormData) {
    return this.http.put(`${environment.storeUrl}category/update-category?name=${name}&categoryId=${categoryId}`,formData);
  }

  getCustomers() {
    return this.http.get(`${environment.authUrl}auth/get-customers`) as Observable<ApiResponse>;
  }

  getAdmins() {
    return this.http.get(`${environment.authUrl}auth/get-admins`) as Observable<ApiResponse>;
  }

  createAdmin(payload:any) {
    return this.http.post(`${environment.authUrl}auth/register-admin`,payload);
  }

  getOrders(payload:any):Observable<ApiResponse> {

    let params :any = {
      page: payload.page,
      size: payload.size
    }

    if(payload.customerId){
      params["name"] = payload.customerId;
    }

    if(payload.status){
      params["status"] = payload.status;
    }

    return this.http.get(`${environment.storeUrl}order/get-orders`, {params:params}) as Observable<ApiResponse>;
  }

  getOrderById(orderId: any) {
    return this.http.get(`${environment.storeUrl}order/get-order/${orderId}`) as Observable<ApiResponse>;
  }

  updateOrderStatus(orderCode:any, status:any) {
    return this.http.put(`${environment.storeUrl}order/update-order-status/${orderCode}?status=${status}`,{});
  }

  getCustomerById(customerId: any) {
    return this.http.get(`${environment.authUrl}auth/get-user/${customerId}`) as Observable<UserData>;
  }
}
