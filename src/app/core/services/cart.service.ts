import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {AuthResponse, ShoppingCart} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
    this.getCart();
  }


  private cartSubject = new BehaviorSubject<ShoppingCart | null>(null);
  public cart$: Observable<ShoppingCart | null> = this.cartSubject.asObservable();

  //Register customer
  getCart(){
    return this.http.get<ShoppingCart>(`${environment.storeUrl}cart/get-cart`).pipe(
      tap((response:ShoppingCart) => {
        this.cartSubject.next(response)
      }),
      catchError((error: any) => {
        console.error("Error fetching cart:", error);
        return throwError(error);
      })
    );
  }

  //Product to cart
  addToCart(payload: any): any {
      return this.http.put<ShoppingCart>(`${environment.storeUrl}cart/add-to-cart/${this.cartSubject.getValue()?.id}`, payload).pipe(
        tap((response:ShoppingCart) => {
          this.cartSubject.next(response)
        })
      )
  }

  //Product to cart
  removeFromCart(payload: any): any {
   const params = {
     cartItemId: Number(payload.cartItemId)
   }

    return this.http.put<ShoppingCart>(`${environment.storeUrl}cart/remove-from-cart/${this.cartSubject.getValue()?.id}`,{},{params:params}).pipe(
      tap((response:ShoppingCart) => {
        this.cartSubject.next(response)
      })
    )
  }

  decreaseQuantity(payload: any): any {
    const params = {
      cartItemId: payload.cartItemId,
      amount: payload.amount
    }

    return this.http.put<ShoppingCart>(`${environment.storeUrl}cart/decrease-item/${this.cartSubject.getValue()?.id}`,{}, {params: params}).pipe(
      tap((response:ShoppingCart) => {
        this.cartSubject.next(response)
      })
    )
  }

  checkoutCart(): any {
    return this.http.post(`${environment.storeUrl}order/create-order/${this.cartSubject.getValue()?.id}`,{}).pipe(
      tap((response: any) => {
        // this.cartSubject.next(response);
      })
    );
  }

}
