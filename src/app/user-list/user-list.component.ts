import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user.model';
import {MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { UserDTO } from '../add-user/user-pdo';
import { switchMap } from 'rxjs';
@Component({
 selector: 'app-user-list',
 templateUrl: './user-list.component.html',
 styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form: { username: string, password: string, isAdmin: boolean } = { username: '', password: '', isAdmin: false };

  displayedColumns: string[] = ['username','isAdmin','Actions'];
 user!:User;
 users:User[]=[];
 dataSource = new MatTableDataSource<User>(this.users);
 _id!: string;
 dialogueOpen = false;
 constructor(private userService: UserService, public dialog: MatDialog){}

 ngOnInit() {
    this.getUsers();
//   this.users=[{name:"user1",password:"pass",isAdmin:false},
//   {name:"user2",password:"pass2",isAdmin:false},
//   {name:"user2",password:"pass2",isAdmin:false}

// ]
// this.dataSource = new MatTableDataSource<User>(this.users);
 }
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
 }
 deleteUser(user:any) {
  this.userService.deleteUser(user).subscribe(
    (response) => {
      console.log('User deleted successfully:', response);
      this.getUsers();
    },
    (error) => {
      console.error('Error deleting user:', error);
      // Handle error if needed
    }
  );
 }

 addUser() {
  if (!this.dialogueOpen) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '450px',
      data: {
        buttonLabel: 'Add',
        user: this.user,
        buttonFunction: this.add,
      }
    });

    // Set the flag to true when the dialogue is opened
    this.dialogueOpen = true;
   this.getUsers();
    // After the dialogue is closed, reset the flag to false
    dialogRef.afterClosed().subscribe(() => {
      this.dialogueOpen = false;
    });
  }
}

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 getUsers() {
   this.userService.getUsers().subscribe({
     next : (res:any)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource<User>(res);
      console.log(this.dataSource)

      // console.log(res.users);
       this.users = res.users;
      //  this.dataSource = new MatTableDataSource<User>(this.users);
     }
   });
 }

 modifyUser(user: User) {
   this.user=user;
  //  if(this.dialog.openDialogs.length == 0){
   const dialogRef = this.dialog.open(AddUserComponent, {
     width: '450px',
    hasBackdrop: false,
     data: {
       buttonLabel: 'Modify',
       user: user,
       buttonFunction: this.modifyUser.bind(this),
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
//  }
}
modify(user: User) {
  this.userService.getUserId(user.name).pipe(
    switchMap((id: string) => this.userService.modifyUser(id, user))
  ).subscribe(
    (response: User) => {
      // Handle the response
      // Update the user data in your component
      this.user = response;
      console.log('User modified successfully', response);
    },
    (error) => {
      // Handle the error
      console.error('Error modifying user', error);
    }
  );
}

 add(user: UserDTO) {
   this.userService.addUser(user);
 }
}
