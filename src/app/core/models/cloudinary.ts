export interface CloudinaryUploadResponse {
    url: string;
    secure_url: string;
    public_id: string;
}

export interface CldAudioResponse extends CloudinaryUploadResponse {
    audio: Audio;
    bytes: number;
    created_at: string;
    display_name: string;
    duration: number;
    original_filename: string;
    signature: string;
}

export interface Audio {
    codec: string;
    bit_rate: string;
    frequency: number;
    channels: string;
    channel_layout: string;
}

export type UploadEvent = 
  | 'started'
  | number
  | CldAudioResponse
  | null;