import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateSongDto } from '../../models';
import { SongsApi, SongFormWrapper } from '../../services';
import { CldAudioResponse } from '../../../../core/models';
import { SongUpload } from '../song-upload/song-upload';

@Component({
    selector: 'app-song-create',
    imports: [ReactiveFormsModule, SongUpload],
    templateUrl: './song-create.html',
    styleUrl: './song-create.scss',
})
export class SongCreate implements OnInit {
    private router = inject(Router);
    
    private songsApi = inject(SongsApi);
    protected formWrap = inject(SongFormWrapper);
    
    protected songForm!: FormGroup;

    private isSongUploading: boolean = false;
    private isSongUploaded: boolean = false;
    private uploadPercentage: number = 0;
    private cldAudioResponse?: CldAudioResponse;

    onSubmit() {
        if (this.songForm.invalid) return;

        const { name, description, creator, releaseDate, origin } = this.songForm.value;
        const songUrl = this.cldAudioResponse?.url || null;

        const createSongDto: CreateSongDto = {
            name, description, creator, date: releaseDate, origin, songUrl
        }

        this.songsApi.create(createSongDto).subscribe({
            next: (response) => {
                this.songForm.reset();
                this.router.navigate(['/song/catalog']);
                console.log(response);
            },
            error: (err) => {
                console.log(err)
            }
                
        });
    }

    onUploadStart() {
        this.isSongUploading = true;
        this.isSongUploaded = false;
    }

    updateProgress(percentage: number) {
        //console.log(percentage);
        this.uploadPercentage = percentage;
    }
    
    songUploaded(data: CldAudioResponse) {
        console.log(data);
        this.isSongUploaded = true;
        this.isSongUploading = false;
        this.cldAudioResponse = data;
    }

    ngOnInit(): void {
        this.songForm = this.formWrap.formGroup;
    }
}
