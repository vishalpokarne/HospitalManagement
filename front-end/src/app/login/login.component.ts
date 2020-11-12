import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

export class Credentials {
    public username: string;
    public password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new Credentials();

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(userCredentials): void {
    this._authenticationService.login(userCredentials.value).subscribe(data => {
      this._authenticationService.saveToken(data.token);
      if(this._authenticationService.isLoggedIn())
        this.router.navigateByUrl('dashboard');
    });
  }

}
