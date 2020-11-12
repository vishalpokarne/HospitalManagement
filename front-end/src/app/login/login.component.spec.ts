import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: ActivatedRoute, useValue: {
            params: of({productId: 123})
          }},
      
        {provide: AuthenticationService, useValue: {
               getProduct: () => of({id: 123, name: 'Product'})
         }}
      ]       
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
   
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
   
    fixture.detectChanges();
  });

  it('should load product detail', () => {
    spyOn(authenticationService, 'login')
    .and
    .callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    //expect(authenticationService.register).toHaveBeenCalledWith(123);
    //expect(component.).toEqual({id: 123, name: 'Product'});
  });

/*   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    imports: [RouterTestingModule],
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
