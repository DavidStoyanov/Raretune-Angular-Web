import { Cloudinary } from '@cloudinary/url-gen';

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CldAudio, CloudinaryUploadResponse } from '../../models';

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

    uploadImage(file: File): Observable<number | CloudinaryUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'rxnva3ib');

        return this.httpClient.post<CloudinaryUploadResponse>(
            `https://api.cloudinary.com/v1_1/dqgftudco/upload`,
            formData,
            {
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(
            map(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    return Math.round((event.loaded / (event.total ?? 1)) * 100);
                }

                if (event.type === HttpEventType.Response && event.body) {
                    return event.body;
                }

                return 0;
            })
        );
    }
}
