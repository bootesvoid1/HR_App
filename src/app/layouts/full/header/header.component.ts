import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class AppHeaderComponent {
  constructor(private router:Router,private auth : AuthService){}
  signOut() {
    this.auth.logout();
    this.router.navigate(['Login']);
  }
}
