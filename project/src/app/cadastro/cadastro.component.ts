import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/User.service';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '../../../node_modules/@angular/router';
import { Graduation } from '../models/graduation.model';
import { GraduationService } from '../services/graduation.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [RouterModule]
})
export class CadastroComponent implements OnInit {

  _id: string;
  name: string;
  email: string;
  graduation: number;
  enrollment: number;
  password: string;
  confirmPassword: string;
  hours: number = 0;

  graduations: Graduation [];

  constructor( private service: UserService, private loginService: LoginService, private router: Router,
    private graduationService: GraduationService) {
    this.graduationService.getGraduations()
      .subscribe(data => {
        console.log(data);
        this.graduations = data;
      }, error => {
        // console.log(error);
      });
   }

  ngOnInit() {  }

  addUser(event) {
    event.preventDefault();
    if (this.name != '' && this.email != '' && this.graduation != undefined  && this.enrollment != undefined && this.password != '' && this.confirmPassword != '') {
      if (this.password == this.confirmPassword) {
        let user = new User(this._id, this.name, this.email, this.graduation, this.enrollment, this.password, this.hours);
        console.log(user);
        this.service.addUser(user)
                    .subscribe(data => {
                        this.router.navigate(['/login']);
                      }, error => {

                      }
                    );
      }
    }
  }
}
