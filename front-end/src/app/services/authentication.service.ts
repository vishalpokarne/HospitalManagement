import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, ObservableLike } from 'rxjs';


export interface UserDetails {
    _id: string,
    firstname: string,
    lastname: string,
    type: string,
    username: string,
    email: string,
    iat: number,
    exp: number
}

interface Token {
    token: string
}

export interface RegisterUserDetails {
    firstname: string,
    lastname: string,
    type: string,
    username: string,
    email: string,
    hashedPassword: string
}

export interface Appointment {
    _id: string;
    date: string;
    createdAt: string;
    createdBy: string,
    name: string,
    email: string
}

@Injectable()
export class AuthenticationService {
    private token: string
    private hostURL: string = "http://localhost:8080";
    private url: string = "http://localhost:8080/authentication";
    private appointments: string = "http://localhost:8080/appointment"

    constructor(private httpClient: HttpClient, private router: Router) { }

    public saveToken(token: string): void {
        localStorage.setItem('userToken', token);
        this.token = token;
    }

    public getToken(): string {
        if(!this.token)
            this.token = localStorage.getItem('userToken');
        return this.token
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        if(!token){
            return null;
        }
        let payload = token.split(".")[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
    }

    public isLoggedIn(): boolean{
        let user = this.getUserDetails();
        if(!user)
            return false;
        return user.exp > Date.now() / 1000;
    }
    
    public register(user: RegisterUserDetails): Observable<any> {
        let registeredUser = this.httpClient.post(`${this.hostURL}/authentication/register`, user);
        return registeredUser;
    }

    public login(credentials: Object): Observable<any>{
        let loggedInData =  this.httpClient.post(`${this.hostURL}/authentication/login`, credentials);
        /* loggedInData.toPromise()
                        .then(response => this.saveToken(response['token']))
                        .catch(err => console.log(err)) */
        return loggedInData;
    }

    public logout(): void {
        this.token = "";
        window.localStorage.removeItem('userToken');
        this.router.navigateByUrl('');
    }

    public getAppointments(userEmail, pageNo, size): Observable<any> {
        let getAllAppointments = this.httpClient.get(`${this.hostURL}/appointment/all/${userEmail}?page=${pageNo}&limit=${size}`, { headers: { authorization: this.token } } );
        return getAllAppointments;
    }

    public createAppointments(appointment): Observable<any> {
        let createdAppointment = this.httpClient.put(`${this.hostURL}/appointment/create`, appointment, { headers: { ContentType: 'application/json', authorization: this.token } } ) ;
        return createdAppointment;
    }

    public deleteAppointment(appointmentId): Observable<any> {
        let deletedAppointment = this.httpClient.delete(`${this.hostURL}/appointment/delete/${appointmentId}`, { headers: { authorization: this.token } } );
        return deletedAppointment;
    }

    public updateUserData(userId, newUserData): Observable<any> {
        let updatedUserData = this.httpClient.patch(`${this.hostURL}/user/${userId}`, newUserData, { headers: { authorization: this.token } });
        return updatedUserData;
    }

}