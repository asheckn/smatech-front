import {inject} from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {isJwtAboutToExpire} from "../functions/helpers";
import {Router} from "@angular/router";


export function AuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let token;
  const router = inject(Router);

  token = localStorage.getItem("token");

  if(token){
    // /Check if token is about to expire
    if(isJwtAboutToExpire(token)){
      console.log('This jwt will expire soon');

      localStorage.clear()
      router.navigateByUrl('/login');
      console.log("Auth Expired");
      return next(request);
    }


    if(request.url.includes("auth")){
      console.log("Auth NO NEED FOR TOKEN INJECTION");
      return next(request);
    }

    console.log("Injecting Token: ", token);
    let tokenizedReq = request.clone({headers: request.headers
        .set('Authorization','Bearer '+token)
        .set('Access-Control-Allow-Origin','*')
        .set('Accept', 'text/html, application/xhtml+xml, */*')
      // .set('Content-Type', 'application/json')
    });
    return next(tokenizedReq);
  }
  let finalRequest = request.clone({headers: request.headers
      .set('Access-Control-Allow-Origin','*')
      .set('Accept', 'text/html, application/xhtml+xml, */*')
      // .set('Content-Type', 'application/json')
  });
  console.log("NO TOKEN TO INJECTED");
  console.log("Request  Url ", finalRequest.url);
  return next(finalRequest);
}
