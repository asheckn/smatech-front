import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order, ShoppingCart} from '../models';
import {environment} from '../../../environment/environment';
import {catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  activeOrder:Order | null = null;

  constructor(private http: HttpClient) {
  }

  getOrders(){
    return this.http.get<Observable<Order>>(`${environment.storeUrl}order/get-my-orders`).pipe(
      tap((response:any) => {

      }),
      catchError((error: any) => {
        console.error("Error fetching orders:", error);
        return throwError(error);
      })
    );
  }

  getOrderByOrderCode(orderCode:string){
    const params = {
      orderCode:orderCode,
    }
    return this.http.get<Observable<Order>>(`${environment.storeUrl}order/get-order-by-code`,{params:params}).pipe(
      tap((response:any) => {

      }),
      catchError((error: any) => {
        console.error("Error fetching order:", error);
        return throwError(error);
      })
    );
  }

  payOrder(payload:any) {
    return this.http.post(`${environment.paymentUrl}payments/create`,payload).pipe(
      tap((response:any) => {

      }),
      catchError((error: any) => {
        console.error("Error fetching order:", error);
        return throwError(error);
      })
    );
  }

  checkPaymentStatus(paymentToken: any) {
    const params = {
      token:paymentToken,
    }
    return this.http.get(`${environment.paymentUrl}payments/success`, {params:params}).pipe(
      tap((response:any) => {

      }),
      catchError((error: any) => {
        console.error("Error fetching order:", error);
        return throwError(error);
      })
    );

  }

  getPayments(customerId:number) {
    return this.http.get(`${environment.paymentUrl}payments/get-payment-by-customerId/${customerId}`)
  }
}
