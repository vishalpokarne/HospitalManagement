import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('Authent', () => {
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthenticationService
      ],
    });

    authenticationService = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should create a user`, async(inject([HttpTestingController, AuthenticationService],
    (httpClient: HttpTestingController, authenticationService: AuthenticationService) => {

        const testUser = {
            firstname: "Vishal",
            lastname: "Pokarne",
            type: "Doctor",
            username: "vishal",
            email: "vishal@gmail.com",
            hashedPassword: "vishal"
        }
        authenticationService.register(testUser).subscribe((registedUser: any) => {
            console.log(registedUser)
            expect(registedUser.message).toEqual('New user created!');
            expect(registedUser).toEqual('New user created!');
            authenticationService.saveToken(registedUser.token);
        });
    })));

    /* it('should get the user details', async(inject([HttpTestingController, AuthenticationService], 
        (httpClient: HttpTestingController, authenticationService: AuthenticationService) => {
            let userDetails = authenticationService.getUserDetails();
            expect(userDetails.firstname).toEqual('Vishal');
        }
    ))) */


});