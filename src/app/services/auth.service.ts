import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError,of,switchMap } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:3000/api/auth/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin() {
   return this.storageService.isAdmin;
  }

  constructor(private http: HttpClient,private storageService:StorageService) {}

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));
  // isAdmin(): boolean {
  //   return JSON.parse(localStorage.getItem('isAdmin') || 'false');
  // }

  setLoginStatus(value:any) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get LoginStatus() {

    return JSON.parse(localStorage.getItem('loggedIn') ||
    this.loggedInStatus.toString());
  }

  set accessToken(token: string)
  {
      localStorage.setItem('accessToken', token);
  }

  get accessToken(): string
  {
      return localStorage.getItem('accessToken') ?? '';
  }


  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.accessToken ? `Bearer ${this.accessToken}` : ''
      })
     };
     console.log("from authservice"+this.storageService.isAdmin);
    //  console.log(this.isAdmin());
    return this.http.post(
     AUTH_API + 'login',
     {
       username,
       password,

     },
     httpOptions
    ).pipe(
     tap((response: any) => {
      this.accessToken = response.accessToken;

      // Set the authenticated flag to true
      this._authenticated = true;
      // this.isAdmin= response.isAdmin;
      // this.isAdmin = response.isAdmin;
       this.storageService.saveToken(response.accessToken);

       this.storageService.saveIsAdmin(response.isAdmin);
     }),
     catchError(this.handleError)
    );
   }

  register(username: string, email: string, password: string,isAdmin:boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.accessToken ? `Bearer ${this.accessToken}` : ''
      })
     };
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
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.accessToken ? `Bearer ${this.accessToken}` : ''
      })
     };
     this.storageService.clean();
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

   signInUsingToken(): Observable<any>
   {
       // Sign in using the token
       return this.http.post('http://localhost:4000/api/auth/login-with-token', {
           accessToken: this.accessToken,
       }).pipe(
           catchError(() =>

               // Return false
               of(false),
           ),
           switchMap((response: any) =>
           {
               // Replace the access token with the new one if it's available on
               // the response object.
               //
               // This is an added optional step for better security. Once you sign
               // in using the token, you should generate a new one on the server
               // side and attach it to the response object. Then the following
               // piece of code can replace the token with the refreshed one.
               if ( response.accessToken )
               {
                   this.accessToken = response.accessToken;
               }

               // Set the authenticated flag to true
               this._authenticated = true;

               // Store the user on the user service

               // Return true
               return of(true);
           }),
       );
   }



   authenticated(): boolean {
    return !!this.storageService.getToken();
   }
   private _authenticated: boolean = false;

   check():Observable<any>
   {

       if ( this._authenticated )
       {
           return of(true);
       }

       // Check the access token availability
       if ( !this.accessToken )
       {
           return of(false);
       }
       return this.signInUsingToken();

      //  if ( AuthUtils.isTokenExpired(this.accessToken) )
      //  {
      //      return of(false);
      //  }

  //      // If the access token exists, and it didn't expire, sign in using it
   }


}
