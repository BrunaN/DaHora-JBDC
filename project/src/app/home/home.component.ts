import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/User.service';
import { LoginService } from '../services/login.service';
import { Attested } from '../models/attested.model';
import { AttestedService } from '../services/attested.service';
import { GraduationService } from '../services/graduation.service';
import { Graduation } from '../models/graduation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  horas: number;

  attesteds: Attested[] = [];

  graduation: Graduation;

  constructor(private userService: UserService, private loginService: LoginService, private attestesService: AttestedService, private graduationService: GraduationService) {
    this.userService.getUser(this.loginService.getToken(), this.loginService.getId())
      .subscribe(data => {
        this.user = data;
        this.loginService.get(this.user);
        this.attesteds = [];
        this.attestesService.getAttestedsFromUser(this.user)
          .subscribe(data => {
            this.attesteds = data;
          },
            error => {
              //console.log(error);
            });
        this.graduationService.getGraduation(this.user.graduation)
          .subscribe(data => {
            this.graduation = data;
          },
            error => {
              //console.log(error);
            });
      },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
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

}
