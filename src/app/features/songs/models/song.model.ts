export interface Song {
    id: string
    name: string
    description: string
    creator: string
    date: string
    origin: string
    posterId: string
    imgUrl?: string
}

export interface CreateSongDto {
    name: string
    description: string
    creator: string
    date: string
    origin: string
    imgUrl?: string
}

export interface EditSongDto {
    name: string
    description: string
    creator: string
    date: string
    origin: string
    imgUrl?: string
}