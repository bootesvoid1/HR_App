import { Component,OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router'


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
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _router:Router) { }

  ngOnInit() {

  }
  Login(form: NgForm){
     if (form.value.password=='admin'&& form.value.Name=='admin'){
      this._router.navigate(['Main']);}
    else
      alert('Wrong Name or Password! ')
  }

}
