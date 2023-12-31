import { HostListener, Injectable } from '@angular/core';
const USER_KEY = 'auth-user';

@Injectable({
 providedIn: 'root'
})

export class StorageService {
 constructor() {}
 @HostListener('window:beforeunload', ['$event'])
 clearLocalStorage(event:any) {
  localStorage.clear();
 }
 public  isAdmin = false;

 clean(): void {
   window.sessionStorage.clear();
   localStorage.clear();
 }
 public saveToken(token: string): void {
  window.localStorage.removeItem('token');
  window.localStorage.setItem('token', token);
 }

 public saveUser(user: any): void {
   window.sessionStorage.removeItem(USER_KEY);
   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
 }

 public getUser(): any {
   const user = window.sessionStorage.getItem(USER_KEY);
   if (user) {
     return JSON.parse(user);
   }

   return null;
 }

 public isLoggedIn(): boolean {
   const user = window.sessionStorage.getItem(USER_KEY);
   if (user) {
     return true;
   }

   return false;
 }
 public saveIsAdmin(isAdmin: boolean): void {
  this.isAdmin=isAdmin;

  window.localStorage.removeItem('isAdmin');
  window.localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

 }
 getToken(): string {
  return localStorage.getItem('token')!;
 }
}
