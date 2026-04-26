export interface Song {
    id: string
    name: string
    description: string
    creator: string
    date: string
    origin: string
    posterId: string
    creatorId?: string
    likedBy?: string[]
    imgUrl?: string
    songUrl: string | null
}

export interface CreateSongDto {
    name: string
    description: string
    creator: string
    date: string
    origin: string
    imgUrl?: string
    songUrl: string | null
}

export interface EditSongDto {
    name: string
    description: string
    creator: string
    date: string
    origin: string
    imgUrl?: string
}

export interface FavSong {
    id: string
    name: string
    description: string
    creator: string
    likedBy?: string[]
    likedAt: string
}