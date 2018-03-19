import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from '../register/register.component';
import {FormBuilder} from '@angular/forms';
import {AuthService, UserService} from '../../services';
import {HttpClientModule} from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ HttpClientModule ],
      providers: [ FormBuilder, UserService, AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
