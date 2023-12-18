import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../user-list/user.model';
import { UserListComponent } from '../user-list/user-list.component';
import { UserService } from '../services/user.service';
import { UserDTO } from './user-pdo';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  template: `
  <button mat-raised-button type="button" class="Discard-btn" (click)="buttonFunction()">{{buttonLabel}}</button>
`,
})
export class AddUserComponent {

cancel() :void {
  this.dialogRef.close();
}
  @Input() buttonLabel!: string;
  @Input() buttonFunction!: Function;
  username! : string ;
  password!: string;
  errorMessage!: string;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  isAdmin!:boolean;
  form: any = {
    username: null,
    password: null
  };
  constructor(private _router:Router,private authService: AuthService,private userService:UserService
    ,public dialogRef: MatDialogRef<UserListComponent>,@Inject(MAT_DIALOG_DATA)
    public data: { users: User[], user: User }) { }

  ngOnInit():void {

  }
  onSubmit(): void {
    const { username, password, isAdmin } = this.form;
    const userDto: UserDTO = { username: username, isAdmin, password };

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
  }


    modifyUser(id: string): void {
      const { username, password, isAdmin } = this.form;
      let updatedUser = new User(username, password, isAdmin);

      // Modifying an existing user
      this.userService.modifyUser(id, updatedUser).subscribe(
        (user: User) => {
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
  }
