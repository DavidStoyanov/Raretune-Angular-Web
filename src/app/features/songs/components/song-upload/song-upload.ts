import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';

import { CloudinaryApi } from '../../../../core/services';
import { CldAudio, CloudinaryUploadResponse } from '../../../../core/models';

@Component({
    selector: 'app-song-upload',
    imports: [CommonModule],
    templateUrl: './song-upload.html',
    styleUrl: './song-upload.scss',
})
export class SongUpload {
    @Output() metadata = new EventEmitter<CloudinaryUploadResponse>();
    @Output() progress = new EventEmitter<number>();

    private cloudinaryApi = inject(CloudinaryApi);
    
    file: File | null = null;
    isDragging = false;

    uploadFile(file: File) {
        this.cloudinaryApi.uploadImage(file).subscribe({
            next: (res: number | CloudinaryUploadResponse) => { 
                switch (typeof res) {
                    case 'number': this.progress.emit(res); return;
                    case 'object': this.metadata.emit(res); return;
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
}
