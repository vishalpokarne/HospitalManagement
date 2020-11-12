import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string = "";
  constructor(private _authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this._authentication.isLoggedIn()){
      const firstname = this._authentication.getUserDetails().firstname;
      this.name = this._authentication.getUserDetails().type === 'doctor' ? `Dr. ${firstname}` : firstname;
    }
    else
      this.router.navigateByUrl('');
  }

  onLogout(){
    this._authentication.logout();
  }

}
