import { Cloudinary } from '@cloudinary/url-gen';

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CloudinaryUploadResponse, CldAudioResponse, UploadEvent } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class CloudinaryApi {
    private readonly CLOUDINARY_URL = 'CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dqgftudco';
    private cld!: Cloudinary;

    constructor(private httpClient: HttpClient) {
        this.cld = new Cloudinary({
            cloud: {
                cloudName: this.CLOUDINARY_URL
            }
        });
    }

    uploadImage(file: File): Observable<UploadEvent> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'rxnva3ib');

        return this.httpClient.post<CldAudioResponse>(
            `https://api.cloudinary.com/v1_1/dqgftudco/upload`,
            formData,
            {
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        return 'started';

                    case HttpEventType.UploadProgress:
                        return Math.round((event.loaded / (event.total ?? 1)) * 100);

                    case HttpEventType.Response:
                        return event.body as CldAudioResponse;

                    default:
                        return null;
                }
            })
        );
    }
}
