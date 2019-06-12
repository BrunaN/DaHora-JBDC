import { Component, OnInit } from '@angular/core';
import { Attested } from '../models/attested.model';
import { UserService } from '../services/User.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user.model';
import { AttestedService } from '../services/attested.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  _id: string;
  title: string;
  type: string;
  hours: number;
  _file: File;

  user: User;

  handleFileInput(event) {
    if (event.target.files.length) {
      this._file = event.target.files[0];
      console.log(this._file);
    }
  }

  constructor(private attestedService: AttestedService, private userService: UserService, private loginService: LoginService) { }

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

  insertAttested(event) {
    let attested = new Attested(this._id, this.loginService.user._id, this.title, this.type, this.hours, this._file);
    this.attestedService.insertAttested(attested)
                      .subscribe(data => {
                        this.title = '';
                        this.type = undefined;
                        this.hours = undefined;
                        this._file = undefined;
                        this.loginService.user.hours += attested.hours;
                      },
                        error => {
                          console.log(error);
                        });
  }

}
