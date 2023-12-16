import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

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
  roles: string[] = [];
  form: any = {
    username: null,
    password: null
  };
  constructor(private _router:Router,private authService: AuthService, private storageService: StorageService) { }

  ngOnInit():void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(): void {
    console.log(this.form)
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
