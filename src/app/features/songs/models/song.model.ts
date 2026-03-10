export interface Song {
    id: string
    name: string
    description: string
    creator: string
    date: string
    publisher?: string //TODO: User
    origin: string
    imgUrl?: string
}

export interface CreateSongDto {
    name: string
    description: string
    creator: string
    date: string
    publisher?: string
    origin: string
    imgUrl?: string
}

export interface EditSongDto {
    name: string
    description: string
    creator: string
    date: string
    publisher?: string
    origin: string
    imgUrl?: string
}