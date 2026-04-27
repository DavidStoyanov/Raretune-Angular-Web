import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { UsersApi } from '../../services';
import { UserRegisterDto } from '../../models';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
    private router = inject(Router);
    
    private usersApi = inject(UsersApi);

    protected registerForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            passData: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
                rePassword: ['', [Validators.required]]
            }, { validators: this.rePasswordValidator })
        })
    }

    /* Error Messages */
    get emailErrorMessage(): string {
        if (this.emailControl?.hasError('required')) {
            return 'Email address is required!'
        } else if (this.emailControl?.hasError('email')) {
            return 'Please enter a valid email address. eg: "name@example.com"';
        } else if (this.emailControl?.hasError('register-failed')){
            return 'Email already used by another user.'
        }

        return '';
    }

    get usernameErrorMessage(): string {
        if (this.usernameControl?.hasError('required')) {
            return 'Username is required!'
        } else if (this.usernameControl?.hasError('minlength')) {
            return 'Username must be at least 2 characters.';
        } else if (this.usernameControl?.hasError('maxlength')) {
            return 'Username should not exceed 25 characters.'
        }

        return '';
    }

    get passDataErrorMessage(): string {
        if (this.passDataControls?.hasError('passdatamismatch')) {
            return 'Passwords should match.'
        }

        return '';
    }

    get passwordErrorMessage(): string {
        if (this.passwordControl?.hasError('required')) {
            return 'Password is required!'
        } else if (this.passwordControl?.hasError('minlength')) {
            return 'Password must be at least 6 characters.';
        } else if (this.passwordControl?.hasError('maxlength')) {
            return 'Password should not exceed 255 characters.'
        }

        return '';
    }

    get rePasswordErrorMessage(): string {
        if (this.rePasswordControl?.hasError('required')) {
            return 'Retype password is required!'
        }

        return '';
    }

    /* Controls */
    get emailControl(): FormControl | null {
        return this.registerForm.get('email') as FormControl;
    }

    get usernameControl(): FormControl | null {
        return this.registerForm.get('username') as FormControl;
    }

    get passDataControls(): FormGroup | null {
        return this.registerForm.get('passData') as FormGroup;
    }

    get passwordControl(): FormControl | null {
        return this.passDataControls?.get('password') as FormControl;
    }

    get rePasswordControl(): FormControl | null {
        return this.passDataControls?.get('rePassword') as FormControl;
    }

    /* Control Validators */
    get isEmailInvalid(): boolean {
        return this.emailControl?.invalid && (this.emailControl.touched || this.emailControl.dirty) || false;
    }

    get isUsernameInvalid(): boolean {
        return this.usernameControl?.invalid && (this.usernameControl.touched || this.usernameControl.dirty) || false;
    }

    get isPassDataInvalid(): boolean {
        return this.passDataControls?.invalid && (this.passDataControls.touched || this.passDataControls.dirty) || false;
    }

    get isPasswordInvalid(): boolean {
        return this.passwordControl?.invalid && (this.passwordControl.touched || this.passwordControl.dirty) || false;
    }

    get isRePasswordInvalid(): boolean {
        return this.rePasswordControl?.invalid && (this.rePasswordControl.touched || this.rePasswordControl.dirty) || false;
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        const { email, username, passData} = this.registerForm.value;
        const { password, rePassword } = passData;

        if (password !== rePassword) return;

        const userRegisterDto: UserRegisterDto = {
            email, username, password
        }

        this.usersApi.register(userRegisterDto).subscribe({
            next: (response) => {
                this.registerForm.reset();
                this.router.navigate(['/song/catalog']);
                console.log(response);
            },
            error: (err) => {
                console.log(err);
                this.onInvalidEmail();
            }
        });
    }

    private rePasswordValidator(passData: AbstractControl): ValidationErrors | null {
        const passwordControl = passData?.get('password');
        const rePasswordControl = passData?.get('rePassword');

        if (!passwordControl || !rePasswordControl) return null;

        const password = passwordControl.value;
        const rePassword = rePasswordControl.value;

        if (password !== rePassword) {
            return { 'passdatamismatch': true }
        } else {
            //the line below should be documented to work properly
            //return { 'passdatamismatch': false }
        }
        return null;
    }

    private onInvalidEmail() {
        this.emailControl?.patchValue('');
        this.emailControl?.setErrors({'register-failed': true});
    }
}
