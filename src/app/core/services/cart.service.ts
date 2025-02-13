import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {

  }

  //Register customer
  getCart(payload: any): any {
    return this.http.get(`${environment.storeUrl}cart/getCart`, payload);
  }
}
