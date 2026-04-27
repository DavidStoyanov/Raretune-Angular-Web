import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class SongFormWrapper {
    private formBuilder = inject(FormBuilder);

    protected songForm: FormGroup;

    constructor() {
        this.songForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
            creator: ['', [Validators.required]],
            releaseDate: ['', [Validators.pattern(/^[12][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|31)$/)]],
            origin: ['', []],
        })
    }

    get formGroup(): FormGroup {
        return this.songForm;
    }

    /* Error Messages */
    get nameErrorMessage(): string {
        if (this.nameControl?.hasError('required')) {
            return 'Song name is required!'
        } else if (this.nameControl?.hasError('minlength')) {
            return 'Song name must be at least 2 characters.';
        } else if (this.nameControl?.hasError('maxlength')) {
            return 'Song name should not exceed 35 characters.'
        }

        return '';
    }

    get descriptionErrorMessage(): string {
        if (this.descriptionControl?.hasError('required')) {
            return 'Description is required!'
        } else if (this.descriptionControl?.hasError('minlength')) {
            return 'Description must be at least 10 characters.';
        } else if (this.descriptionControl?.hasError('maxlength')) {
            return 'Description should not exceed 5000 characters.'
        }

        return '';
    }

    get creatorErrorMessage(): string {
        if (this.creatorControl?.hasError('required')) {
            return 'Creator name is required!'
        }

        return '';
    }

    get releaseDateErrorMessage(): string {
        if (this.releaseDateControl?.hasError('pattern')) {
            return 'Release Date should be in following format: "2009-04-23"'
        }

        return '';
    }

    /* Controls */
    get nameControl(): AbstractControl<any, any, any> | null {
        return this.songForm.get('name');
    }

    get descriptionControl(): AbstractControl<any, any, any> | null {
        return this.songForm.get('description');
    }

    get creatorControl(): AbstractControl<any, any, any> | null {
        return this.songForm.get('creator');
    }

    get releaseDateControl(): AbstractControl<any, any, any> | null {
        return this.songForm.get('releaseDate');
    }

    get originControl(): AbstractControl<any, any, any> | null {
        return this.songForm.get('origin');
    }

    /* Control Validators */
    get isNameInvalid(): boolean {
        return this.nameControl?.invalid && (this.nameControl.touched || this.nameControl.dirty) || false;
    }

    get isDescriptionInvalid(): boolean {
        return this.descriptionControl?.invalid && (this.descriptionControl.touched || this.descriptionControl.dirty) || false;
    }

    get isCreatorInvalid(): boolean {
        return this.creatorControl?.invalid && (this.creatorControl.touched || this.creatorControl.dirty) || false;
    }

    get isReleaseDateInvalid(): boolean {
        return this.releaseDateControl?.invalid && (this.releaseDateControl.touched || this.releaseDateControl.dirty) || false;
    }

    get isOriginInvalid(): boolean {
        return this.originControl?.invalid && (this.originControl.touched || this.originControl.dirty) || false;
    }
}