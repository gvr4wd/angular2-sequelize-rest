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
      firstName: ['', Validators.required],
      lastName: ''
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
        firstName: this.user.firstName,
        lastName: this.user.lastName
      })
    }
  }
}
