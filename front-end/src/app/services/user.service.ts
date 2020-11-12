import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService{

    constructor(private httpClient: HttpClient) { }

    login(): Observable<any> {
        return this.httpClient.post('http://localhost:8080/authentication/login', {
            "username": "yatin166",
            "password": "yatin166"
        });
    }
}