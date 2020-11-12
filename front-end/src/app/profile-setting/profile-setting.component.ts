import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export class UserDetails {
  _id: string;
  firstname: string;
  lastname: string;
  type: string;
  username: string;
  email: string
}

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {

  userdetails = new UserDetails();
  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.userdetails = this._authenticationService.getUserDetails();
  }

  onUpdateUserDetails(form){
    this._authenticationService.updateUserData(this.userdetails._id, form.value).subscribe(updatedUserData => {
      this._authenticationService.saveToken(updatedUserData.token);
      this.getUserDetails();
    })
  }

}
