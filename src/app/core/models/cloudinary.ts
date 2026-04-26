export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    url: string;
}

export interface Audio {
    codec: string;
    bit_rate: string;
    frequency: number;
    channels: string;
    channel_layout: string;
}

export interface CldAudio {
    url: string;
    secure_url: string;
    audio: Audio;
    bytes: number;
    created_at: string;
    display_name: string;
    duration: number;
    original_filename: string;
    signature: string;
}