import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user.model';
import { UserService } from '../services/User.service';
import { Router, RouterModule } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  _id: string;
  name: string;
  email: string;
  graduation: number;
  enrollment: number;

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) {
    this.userService.getUser(this.loginService.getToken(), this.loginService.getId())
        .subscribe(data => {
          this.user = data;
          this.loginService.get(this.user);
        },
          error => {
            console.log(error);
          }
        );
  }

  ngOnInit() {
  }

  update(event) {
    event.preventDefault();
    if (this.email != '' && this.name != '') {
      event.preventDefault();
      this.userService.update(this.loginService.getToken(), this.user)
        .subscribe(data => {
          this.router.navigate(['/home']);
        },
          error => {
            console.log(error);
          }
        );
    }
  }
}
