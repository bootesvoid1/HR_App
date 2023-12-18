import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user-list/user.model';

@Injectable({
 providedIn: 'root',
})
export class UserService {
 private API_URL = 'http://localhost:3000/api/users';

 constructor(private http: HttpClient) {}
 getUserId(username: string): Observable<string> {
  return this.http.get<string>(`${this.API_URL}/find/${username}`);
 }
 getUsers(): Observable<User[]> {
  // console.log(this.http.get<User[]>(this.API_URL));
   return this.http.get<User[]>(this.API_URL);
 }

 addUser(data: any): Observable<User> {
   return this.http.post<User>(this.API_URL, data);
 }

 deleteUser(user: User): Observable<any> {

  const userId = user._id;
  console.log(user._id);
  // Perform the delete operation using the extracted user ID
  return this.http.delete(`${this.API_URL}/${userId}`);
}

 modifyUser(_id: string, data: any): Observable<User> {
   return this.http.put<User>(`${this.API_URL}/${_id}`, data);
 }
}
