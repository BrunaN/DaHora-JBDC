import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserService } from './User.service';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

    url: string = 'http://localhost:8080/dahora/api/user/login';

    user: User;

    constructor ( private http: Http, private userService: UserService ) {  }

    setToken(token) {
        window.localStorage.setItem("token", token);
    }

    getToken() {
        return window.localStorage.getItem("token");
    }

    setId(id) {
        window.localStorage.setItem("_id", id);
    }

    getId() {
        return window.localStorage.getItem("_id");
    }

    hasToken() {
        if (window.localStorage.getItem("token")) {
            return window.localStorage.getItem("token");
        }
    }

    removeLocal() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("_id");
    }

    get(user) {
        this.user = user;
        console.log(this.user);
    }

    login(email, password){
        return this.http.post(this.url, {
            enrollment: email,
            password: password
        }).map((response: Response) => {
            let res =  response.json();
            this.setToken(res.token);
            this.setId(res.id);
            return res;
        }).catch((error: Response) => Observable.throw(error));
    }

}
