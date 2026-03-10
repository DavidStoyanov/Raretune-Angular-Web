import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateSongDto, Song } from '../../models';
import { SongsApi, SongFormWrapper } from '../../services';

@Component({
  selector: 'app-song-create',
  imports: [ReactiveFormsModule],
  templateUrl: './song-create.html',
  styleUrl: './song-create.scss',
})
export class SongCreate implements OnInit {
    private router = inject(Router);
    
    private songsApi = inject(SongsApi);
    
    protected formWrap = inject(SongFormWrapper);
    protected songForm!: FormGroup;

    constructor() {}
    
    onSubmit() {
        if (this.songForm.invalid) return;

        const { name, description, creator, releaseDate, origin } = this.songForm.value;

        const createSongDto: CreateSongDto = {
            name, description, creator, date: releaseDate, origin
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

    ngOnInit(): void {
        this.songForm = this.formWrap.formGroup;
    }

}
