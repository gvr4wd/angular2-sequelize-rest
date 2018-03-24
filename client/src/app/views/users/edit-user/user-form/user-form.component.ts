import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input()
  user: User = null;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.fb.group({
      login: [{value:'', disabled: true}, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['user']);
    this.rebuildForm();
  }

  rebuildForm() {
    console.log(this.user);
    if (this.user) {
      this.userForm.setValue({
        login: this.user.login,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        avatar: this.user.avatar
      })
    }
  }

  get firstName() {
    return this.userForm.get('firstName');
  }
}
