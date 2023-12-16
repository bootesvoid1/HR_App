import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../user-list/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] =[];
  private UpdatedUsers=new Subject<User[]>();
  private API_URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`, { responseType: 'text' });
  }
AddUser(data:any){
  return this.http.post(`${this.API_URL}/users`,data)
}
DeleteUser(data:User){
  return this.http.delete(`${this.API_URL}/data._id`);
}
ModifyUser(data:any){
  return this.http.put(`${this.API_URL}/users`,data)
}
}
