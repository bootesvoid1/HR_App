import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private storageService:StorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
     AUTH_API + 'signin',
     {
       username,
       password,
     },
     httpOptions
    ).pipe(
     tap((response: any) => {

       this.storageService.saveToken(response.accessToken);

       this.storageService.saveIsAdmin(response.isAdmin);
     }),
     catchError(this.handleError)
    );
   }

  register(username: string, email: string, password: string,isAdmin:boolean): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        password,
        isAdmin
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
   }
  

   authenticated(): boolean {
    return !!this.storageService.getToken();
   }

}
