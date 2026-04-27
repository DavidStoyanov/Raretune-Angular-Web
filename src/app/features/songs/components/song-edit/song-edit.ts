import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SongsApi, SongFormWrapper } from '../../services';
import { EditSongDto, Song } from '../../models';
import { CldAudioResponse } from '../../../../core/models';
import { SongUpload } from '../song-upload/song-upload';

@Component({
    selector: 'app-song-edit',
    imports: [ReactiveFormsModule, SongUpload],
    templateUrl: './song-edit.html',
    styleUrl: './song-edit.scss',
})
export class SongEdit implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private songsApi = inject(SongsApi);
    protected formWrap = inject(SongFormWrapper);

    protected songForm!: FormGroup;

    private songId: string | null = null;

    private cldAudioResponse?: CldAudioResponse;

    constructor() {}

    onSubmit() {
        if (this.songForm.invalid) return;
        if (this.songId === null) return;

        const { name, description, creator, releaseDate, origin } = this.songForm.value;
        
        const songUrl = this.cldAudioResponse?.url || null;
        const editSongDto: EditSongDto = {
            name, description, creator, date: releaseDate, origin, songUrl
        }

        this.songsApi.update(editSongDto, this.songId).subscribe({
            next: (response) => {
                this.songForm.reset();
                const destinationUrl = `/song/${this.songId}`;
                this.router.navigateByUrl(destinationUrl);
                console.log(response);
            },
            error: (err) => {
                console.log(err)
            }
                
        });
    }

    ngOnInit(): void {
        this.songForm = this.formWrap.formGroup;
        
        this.songId = this.route.snapshot.paramMap.get('songId');
        if (this.songId === null) return;

        this.songsApi.getOne(this.songId).subscribe({
            next: (song) => { this.patchSongForm(song) },
            error: (err) => { console.log(err) },
        });
    }

    songUploaded(data: CldAudioResponse) {
        console.log(data);
        this.cldAudioResponse = data;
    }

    private patchSongForm(song: Song) {
        this.songForm.patchValue({
            ...song,
            releaseDate: song.date
        });
    }
}
