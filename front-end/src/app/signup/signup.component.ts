import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

export class RegisterForm {
  public firstname: string;
  public lastname: string;
  public type: string;
  public username: string;
  public email: string;
  public hashedPassword: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register = new RegisterForm();

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form): void{
    this._authenticationService.register(form.value).subscribe(registerdUser => {
      this._authenticationService.saveToken(registerdUser.token);
      if(this._authenticationService.isLoggedIn())
        this.router.navigateByUrl('dashboard');
    });
  }

}
