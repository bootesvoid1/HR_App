import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../user-list/user.model';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  template: `
  <button mat-raised-button type="button" class="Discard-btn" (click)="buttonFunction()">{{buttonLabel}}</button>
`,
})
export class AddUserComponent {
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
  constructor(private _router:Router,private authService: AuthService, private storageService: StorageService
    ,public dialogRef: MatDialogRef<UserListComponent>,@Inject(MAT_DIALOG_DATA)
    public data: { users: User[], user: User }) { }

  ngOnInit():void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.isAdmin = this.storageService.getUser().isAdmin;
    }
  }
  onSubmit(): void {
    console.log(this.form)
    const { username, password,isAdmin } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isAdmin = this.storageService.getUser().isAdmin;

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

}
