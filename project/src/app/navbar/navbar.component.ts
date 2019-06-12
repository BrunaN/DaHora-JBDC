import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/User.service';
import { User } from '../models/user.model';
import { Router, RouterModule } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [RouterModule]
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) { }

  user: User;

  ngOnInit() {
    this.user = this.loginService.user;
  }

  logout(event) {
    event.preventDefault();
    this.loginService.removeLocal();
    this.router.navigate(['/home']);
  }
}
