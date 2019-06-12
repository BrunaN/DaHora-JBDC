import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Graduation } from '../models/graduation.model';

@Injectable()
export class GraduationService {

    url: string = 'http://localhost:8080/dahora/api/graduations';

    graduations: Graduation [] = [];

    constructor ( private http: Http ) {  }

    getGraduation(id) {
        return this.http.get(this.url + '/' + id)
            .map((response: Response) => {
                let res = response.json();
                let graduation = new Graduation(res._id, res.id, res.name, res.hours);
                console.log(graduation);
                return graduation;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getGraduations() {
        return this.http.get(this.url)
            .map((response: Response) => {
                console.log("Teste");
                this.graduations = [];
                for (let graduation of response.json()) {
                    this.graduations.push(new Graduation(graduation._id, graduation.id, graduation.name, graduation.hours));
                }
                console.log(response);
                return this.graduations;
            })
            .catch((error: Response) => Observable.throw(error));
    }
}
