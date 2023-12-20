import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../user-list/user.model';
import { UserListComponent } from '../user-list/user-list.component';
import { UserService } from '../services/user.service';
import { UserDTO } from './user-pdo';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
//   template: `
//   <button mat-raised-button type="button" class="Discard-btn" (click)="buttonFunction()">{{buttonLabel}}</button>
// `,
})
export class AddUserComponent {

  @Input() buttonLabel!: string;
  @Input() buttonFunction!: Function;
  form: { username: string, password: string, isAdmin: any } = { username: '', password: '', isAdmin: false };

  username! : string ;
  password!: string;
  errorMessage!: string;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  isAdmin!:boolean;

  constructor(private _router:Router,private authService: AuthService,private userService:UserService
    ,public dialogRef: MatDialogRef<UserListComponent>,@Inject(MAT_DIALOG_DATA)public data: any)

     {
      console.log(this.data)


      this.form = {username: this.data && this.data.user ? this.data.user.username : '', password: this.data.user ? this.decrypt(data.user.password): '', isAdmin:this.data.user ?  this.data.user.isAdmin ? 'true' : 'false' : ''}
      const buttonFunction = this.data.buttonFunction
      const user = this.data.user;}
    // console.log(user) }

  ngOnInit():void {

  }
  decrypt(password:any){
    const decryptedPassword = CryptoJS.AES.decrypt(
      password,
      "07cb45cfa72699bf4d1b14a3c197104b"
    ).toString(CryptoJS.enc.Utf8);
    return decryptedPassword
  }
  onSubmit(): void {
    const { username, password, isAdmin } = this.form;
    const userDto: UserDTO = { username: username, isAdmin, password };
    if(this.data.buttonLabel === 'Create'){
      this.userService.addUser(userDto).subscribe(
        (user: User) => {
          // Extract the _id from the MongoDB response
          const mongoDBId = user._id;
          console.log('User added successfully with MongoDB _id:', mongoDBId);
          this.userService.getUsers();
          // Handle success if needed
        },
        (error) => {
          console.error('Error adding user', error);
          // Handle error if needed
        }
      );

    }else{
     this.modifyUser(this.data.user._id);
    }

  }


    modifyUser(id: string): void {
      // console.log(this.form)
      const { username, password, isAdmin } = this.form;
      let updatedUser = new User(username, password, isAdmin);
      console.log(updatedUser)

      // Modifying an existing user
      this.userService.modifyUser(id,  this.form).subscribe(
        (user: any) => {
          console.log('User modified successfully', user);
          // Handle success if needed
        },
        (error) => {
          console.error('Error modifying user', error);
          // Handle error if needed
        }
      );
    }

    deleteUser(user: User): void {
      // Deleting an existing user
      this.userService.deleteUser(user).subscribe(
        () => {
          // The user has been deleted successfully
          console.log('User deleted successfully');
          // Handle success if needed
        },
        (error) => {
          // An error occurred while trying to delete the user
          console.error('Error deleting user', error);
          // Handle error if needed
        }
      );
    }
    cancel() :void {
      this.dialogRef.close();
      this.form={ username: '', password: '', isAdmin: false }
    }
  }
