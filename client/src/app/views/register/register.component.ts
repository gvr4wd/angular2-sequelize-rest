import { Component } from '@angular/core';
import {User} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { error } from 'util';
// import { PasswordValidation } from './password-validation';
import {AbstractControl} from '@angular/forms';



@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

    registerSuccess: boolean = false;
    user: User = new User();
    form: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    // firstName = new FormControl('', Validators.required);

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private router: Router) {
                    this.form = this.fb.group({
                        'login': ['',[Validators.required,Validators.minLength(5)]],
                        'password': ['', [Validators.required,Validators.minLength(14)]],
                        'confirmPassword': ['', Validators.required],
                        'firstName': ['', Validators.required],
                        'lastName': ['', Validators.required],
                        'email': ['', [Validators.required, Validators.email]]
                    }, {
                         validator :  RegisterComponent.MatchPassword // imported validation method
                    }
                );
        
    }

    ngOnInit() {

        
        // we will initialize our form model 
        this.subcribeToFormChanges();
    }

    initPasswordComplexity() {
        const passRegex = `/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/`;

        const model = {
            'password': ['', [Validators.required,Validators.minLength(14),Validators.pattern(passRegex)]],
        };

        return model;
    }

    register(model: User, isValid: boolean) {
        console.log('model-based form submitted');
        this.submitted = true;
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);

        console.log("getting the form data",this.form);
        console.log (this.user);
        this.userService.register(model).then (resp => {
            
            console.log ('register success!!!!!!');
            this.registerSuccess = true;

            // add navigation to login page here.
            this.router.navigate(['/login']);
        }).catch(error => {
            // this.registerSuccess;
            console.log ('register failed');
            // this.router.navigate(['/register']); Show a message when register fails
        });
    }

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
       
         if(password != confirmPassword) {
                 // console.log('false');
                 AC.get('confirmPassword').setErrors( {MatchPassword: true} )
             } else {
                 // console.log('true');
                 return null
             }
     } 

    subcribeToFormChanges() {
        // initialize stream
        const myFormValueChanges$ = this.form.valueChanges;
    
        // subscribe to the stream 
        myFormValueChanges$.subscribe(x => this.events
            .push({ event: 'STATUS CHANGED', object: x }));
    }
}