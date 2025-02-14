import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {environment} from '../../../environment/environment';
import {AuthResponse} from '../models';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.authUrl;
  constructor(private http: HttpClient) {
    // Load user from local storage on service init

    const storedUserJson = localStorage.getItem('user');
    console.log("Getting user for local storage")
    if (storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson);
        if (storedUser) {
          console.log(storedUser);
          this.userSubject.next(storedUser);
        }
      } catch (error) {
        console.log("No user")
        console.error('Error parsing stored user:', error);
        this.userSubject.next(null);
      }
    } else {
      console.log("No user")
      this.userSubject.next(null);
    }

  }

  private userSubject = new BehaviorSubject<AuthResponse | null>(null);
  public user$: Observable<AuthResponse | null> = this.userSubject.asObservable();

  getUser(): AuthResponse | null {
    return this.userSubject.value;
  }

  //Register customer
  register(payload: any): any {
    return this.http.post(`${environment.authUrl}auth/register`, payload);
  }

  login(payload: any): any {
    return this.http.post<AuthResponse>(`${environment.authUrl}auth/authenticate`, payload).pipe(
      tap((response: AuthResponse) => {
        if(response.data.isActive){
          // Update cache values
          localStorage.setItem('user', JSON.stringify(response));
          this.userSubject.next(response);
          localStorage.setItem('token', response.token);
        }else {
         throw Error;
        }

      }),
      // catchError((error: any) => {
      //   console.error("Error fetching store items:", error);
      //
      //   return throwError(error);
      // })
    );
  }

  logout(): void {
    localStorage.clear()
    this.userSubject.next(null);
  }

  verifyEmail(payload: any): any {
    return this.http.post(`${this.authUrl}auth/registrationConfirmation`, payload);
  }

  signIn(payload: any): any {
    return this.http.post(`${this.authUrl}auth/restaurant/admin/login`, payload);
  }

  refreshAuth(payload: any): any {
    console.log("Get new token");
    //Todo change to my tenders
    return this.http.post(`${this.authUrl}auth/refresh`, payload);
  }

  forgotPassword(cardCode:any = '', emailAddress:any): any {
    let payload = {
      emailAddress: emailAddress,
      cardCode: cardCode,
    }

    return this.http.post(`${this.authUrl}StoreBusinessPartners/ResetPassword/GetOpt`,payload);
  }

  resetPassword(otp:any, newPassword:any, confirmPassword:any, cardCode:any): any {
    let payload =
    {
      otp: otp,
      newPassword: newPassword,
      confirmNewPassword: confirmPassword
    };

    return this.http.post(`${this.authUrl}StoreBusinessPartners/${cardCode}/ResetPassword`, payload);
  }

  changePassword(oldPassword:any, newPassword:any, confirmPassword:any, cardCode:any): any {
    let payload =
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword
      };

    return this.http.post(`${this.authUrl}StoreBusinessPartners/${cardCode}/ChangePassword`, payload);
  }





  // Logout
  logOut() {
    localStorage.clear()
    window.location.reload();
  }
}


export interface UserSession {
  userCode: string;
  userName: string;
  userId: number;
  employeeId: number;
  jobTitle: string;
  salesPersonCode: number;
  token: string;
  tokenExpiry: string;
  databaseName: string;
  warehouseCode: string;
  roles: string[];
  posRoles?: string | null;
  companyName: string;
  warehouseName?: string | null;
  companySettings?: {
    localCurrency: string;
    systemCurrency: string;
    isDirectRate: boolean;
  };
  customer?: {
    cardCode: string;
    cardName: string;
    currency: string;
    warehouse: string;
    isVisitor: boolean;
    warehouseName: string;
  };
}

