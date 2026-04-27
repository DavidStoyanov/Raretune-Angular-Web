import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { UsersApi } from '../../services';
import { UserLoginDto } from '../../models';
import { RedirectService } from '../../../../core/services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
    private router = inject(Router);
    
    private usersApi = inject(UsersApi);
    private redirectService = inject(RedirectService);

    protected loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
        })
    }

    /* Error Messages */
    get emailErrorMessage(): string {
        if (this.emailControl?.hasError('required')) {
            return 'Email address is required!'
        } else if (this.emailControl?.hasError('email')) {
            return 'Please enter a valid email address. eg: "name@example.com"';
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
        } else if (this.passwordControl?.hasError('login-failed')){
            return 'Invalid username or password!'
        }

        return '';
    }

    /* Controls */
    get emailControl(): AbstractControl<any, any, any> | null {
        return this.loginForm.get('email');
    }

    get passwordControl(): AbstractControl<any, any, any> | null {
        return this.loginForm.get('password');
    }

    /* Control Validators */
    get isEmailInvalid(): boolean {
        return this.emailControl?.invalid && (this.emailControl.touched || this.emailControl.dirty) || false;
    }

    get isPasswordInvalid(): boolean {
        return this.passwordControl?.invalid && (this.passwordControl.touched || this.passwordControl.dirty) || false;
    }


    onSubmit() {
        if (this.loginForm.invalid) return;

        const { email, password } = this.loginForm.value;

        const userLoginDto: UserLoginDto = {
            email, password
        }

        this.usersApi.login(userLoginDto).subscribe({
            next: (response) => {
                console.log(response);
                this.loginForm.reset();
                const redirectUrl = this.redirectService.getRedirect();
                if (redirectUrl !== null) {
                    this.router.navigate([redirectUrl]);
                } else {
                    this.router.navigate(['/song/catalog']);
                }
            },
            error: (err) => {
                console.log(err);
                this.onInvalidPassword();
            }
        })
    }

    private onInvalidPassword() {
        this.passwordControl?.patchValue('');
        this.passwordControl?.setErrors({'login-failed': true});
    }
}
