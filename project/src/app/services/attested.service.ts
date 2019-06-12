import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Attested } from '../models/attested.model';
import { User } from '../models/user.model';


@Injectable()
export class AttestedService {

    url: string = 'http://localhost:8080/dahora/api/attesteds';
    urlAttestedsFromUser: string = 'http://localhost:8080/dahora/api/users/';
    

    attesteds: Attested[] = [];

    constructor(private http: Http) { }

    insertAttested(attested: Attested) {

        let formData = new FormData();
        if (attested._file) {
            formData.append('_file', attested._file);
        }

        for (let key in attested) {
            if (key != '_file' && attested[key]) {
                console.log(key, attested[key]);
                formData.append(key, attested[key]);
            }
        }

        return this.http.post(this.url, formData)
            .map((response: Response) => {
                let res = response.json();
                let attested = new Attested(res._id, res.user, res.title, res.type, res.hours, res._file);
                console.log(attested);
                this.attesteds.push(attested);
                return attested;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getAttestedsFromUser(user: User) {
        return this.http.get(this.urlAttestedsFromUser + user._id + "/attesteds")
        .map((response: Response) => {
            console.log(response);
            this.attesteds = [];
            for (let attested of response.json()) {
                this.attesteds.push(new Attested(attested._id, user, attested.title, attested.type, attested.hours, attested._file));
            }
            return this.attesteds;
        })
        .catch((error: Response) => Observable.throw(error));
    }

    delete(attested: Attested) {
        return this.http.delete((this.url + '/' + attested._id))
                        .map((response: Response) => {
                            this.attesteds.splice( this.attesteds.indexOf(attested), 1 );

                            console.log(this.attesteds);
                        })
                        .catch((error: Response) => Observable.throw(error));
    }

}
