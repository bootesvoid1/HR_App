import { Component,OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  constructor(private _router:Router,private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      const isAdmin = JSON.parse(window.localStorage.getItem('isAdmin') as string);
      this.isAdmin = isAdmin;
      this._router.navigate(['certificate']);
    }
   }
  onSubmit(): void {
    console.log(this.form)
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      (response: any) => {

        this.storageService.saveToken(response.accessToken);
      },
      (error) => {
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      })

  }

  reloadPage(): void {
    window.location.reload();
  }
}
