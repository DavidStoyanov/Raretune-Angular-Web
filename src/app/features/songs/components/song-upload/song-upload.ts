import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';

import { CloudinaryApi } from '../../../../core/services';
import { CldAudioResponse, UploadEvent } from '../../../../core/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-song-upload',
    imports: [CommonModule],
    templateUrl: './song-upload.html',
    styleUrl: './song-upload.scss',
})
export class SongUpload implements OnDestroy {
    @Output() newProcess = new EventEmitter<void>();
    @Output() progress = new EventEmitter<number>();
    @Output() metadata = new EventEmitter<CldAudioResponse>();

    private cloudinaryApi = inject(CloudinaryApi);
    private songUploadSub?: Subscription;

    file: File | null = null;
    isDragging: boolean = false;
    isUploaded: boolean = false;
    percentage: number = 0;

    uploadFile(file: File) {
        this.songUploadSub = this.cloudinaryApi.uploadImage(file).subscribe({
            next: (res: UploadEvent) => { 
                if (res === null) return;
                switch (typeof res) {
                    case 'string':
                        this.isUploaded = false;
                        this.newProcess.emit();
                        return;

                    case 'number':
                        this.percentage = res;
                        this.progress.emit(res);
                        return;

                    case 'object':
                        this.isUploaded = true;
                        this.metadata.emit(res);
                        return;
                }
            },
            error: (err) => { console.log(err); },
        })
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;

        this.file = input.files[0];
        this.uploadFile(this.file);
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;

        if (!event.dataTransfer?.files.length) return;

        this.file = event.dataTransfer.files[0];
        this.uploadFile(this.file);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave() {
        this.isDragging = false;
    }

    getPadding() {
        return {
            padding: this.file ? '1em 2em' : '1em 4em'
        };
    }

    
    ngOnDestroy(): void {
        this.songUploadSub?.unsubscribe();
    }
}
