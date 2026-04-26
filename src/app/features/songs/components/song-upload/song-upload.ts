import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-song-upload',
    imports: [CommonModule],
    templateUrl: './song-upload.html',
    styleUrl: './song-upload.scss',
})
export class SongUpload {
    file: File | null = null;
    isDragging = false;

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;

        this.file = input.files[0];
    }
    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;

        if (!event.dataTransfer?.files.length) return;

        this.file = event.dataTransfer.files[0];
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
