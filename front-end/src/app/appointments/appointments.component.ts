import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export class CreateAppointment {
  public date: string;
  public name: string;
  public email: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  buttonLabel = "Create";
  showFormStatus: boolean = false;
  appointment = new CreateAppointment();
  appointments: Array<Object>;
  userType: string;
  pageNo: number = 1;
  size: number = 3;
  totalPages: number;
  activePage: number = 1;
  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllAppointments(this.pageNo, this.size);
    this.getUserDetails();
  }


  getUserDetails(){
    this.userType = this._authenticationService.getUserDetails().type.toLowerCase();
  }

  onAppointmentCreate(form){
    form.value.createdBy = this._authenticationService.getUserDetails().email;
    form.value.createdAt = new Date();
    this._authenticationService.createAppointments(form.value).subscribe(createdAppointment => {
      this.getAllAppointments(this.pageNo, this.size);
    });
  }

  onCreateAppointmentButton() {
    this.showFormStatus = !this.showFormStatus;
    this.buttonLabel = this.showFormStatus ? "Hide" : "Create";
  }

  getAllAppointments(pageNo, size){
    const userEmail = this._authenticationService.getUserDetails().email;
    this._authenticationService.getAppointments(userEmail, pageNo, size).subscribe(appointments => {
      this.appointments = appointments.appointments;
      this.totalPages = appointments.totalPages;
    });
  }

  onAppointmetDelete(appointmentId){
    this._authenticationService.deleteAppointment(appointmentId).subscribe(deletedAppointment => {
      this.getAllAppointments(this.pageNo, this.size);
    })
  }

  createPaginationRange(totalPages){
    let elements = [];
    for(let i=1; i<=totalPages; i++)
      elements.push(i);
    return elements;
  }

  onPageClick(pageNo){
    this.pageNo = pageNo;
    this.activePage = pageNo;
    this.getAllAppointments(this.pageNo, this.size);
  }


}
