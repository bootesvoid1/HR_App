import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user.model';
import {MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
 selector: 'app-user-list',
 templateUrl: './user-list.component.html',
 styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
displayedColumns: string[] = ['username','isAdmin','Actions'];
 user!:User;
 users:User[]=[];
 dataSource = new MatTableDataSource<User>(this.users);
 _id!: string;
 constructor(private userService: UserService, public dialog: MatDialog){}

 ngOnInit() {
    this.getUsers();
//   this.users=[{name:"user1",password:"pass",isAdmin:false},
//   {name:"user2",password:"pass2",isAdmin:false},
//   {name:"user2",password:"pass2",isAdmin:false}

// ]
this.dataSource = new MatTableDataSource<User>(this.users);
 }
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
 }
 deleteUser(user:any) {
   this.userService.deleteUser(user)
 }

 addUser() {
   console.log(this.user);
   const dialogRef = this.dialog.open(AddUserComponent, {
     width: '450px',
     data: {
       buttonLabel: 'Add',
       user: this.user,
       buttonFunction: this.add,
     }
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.getUsers();
       console.log(result);
     } else {
       console.log('Dialog closed without result');
     }
   });
 }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 getUsers() {
   this.userService.getUsers().subscribe({
     next : (res:any)=>{
      // console.log(res);
      // console.log(res.users);
      //  this.users = res.users;
       this.dataSource = new MatTableDataSource<User>(res);
     }
   });
 }

 modifyUser(user: User) {
   console.log(user);
   const dialogRef = this.dialog.open(AddUserComponent, {
     width: '450px',
     data: {
       buttonLabel: 'Modify',
       user: user,
       buttonFunction: this.modify,
     }
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.getUsers();
       console.log(result);
     } else {
       console.log('Dialog closed without result');
     }
   });
 }

 modify(user: User) {
  this.userService.getUserId(user.name).subscribe(
  (id: string) => {
   this.userService.modifyUser(id, user).subscribe(
    (response: User) => {
      // Handle the response
      // Update the user data in your component
      this.user = response;
    },
    (error) => {
      // Handle the error
    }
   );
  },
  (error) => {
   // Handle the error
  }
  );
 }


 add(user: User) {
   this.userService.addUser(user);
 }
}
