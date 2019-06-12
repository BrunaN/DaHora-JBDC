import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginService } from './login.service';

@Injectable()
export class UserService {

    url: string = 'http://localhost:8080/dahora/api/users';

    constructor ( private http: Http ) {  }

    addUser(user: User) {
        return this.http.post(this.url, user)
            .map((response: Response) => {
                let res = response.json();
                let user = new User(res._id, res.name, res.email, res.graduation, res.enrollment, res.password, res.hours);
                console.log(user);
                return user;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getUser(token, id) {
        return this.http.get(this.url + '/' + id)
            .map((response: Response) => {
                let res = response.json();
                let user = new User(res._id, res.name, res.email, res.graduation, res.enrollment, res.password, res.hours);
                console.log(user);
                return user;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    update(token, user: User) {
        return this.http.put((this.url + '/' + user._id), user)
                        .map((response: Response) => {
                            let res = response.json();
                            let user = new User(res._id, res.name, res.email, res.graduation, res.enrollment, res.password, res.hours);
                            return user;
                        })
                        .catch((error: Response) => Observable.throw(error));
    }

}
