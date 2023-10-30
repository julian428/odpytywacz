/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        user: {
            record: {
                collectionId: string,
                collectionName: 'users',
                created: string,
                email: string,
                emailVisibility: boolean,
                id: string,
                updated: string,
                username: string,
                verified: boolean
              },
              token: string
        } | null
        loggedIn: boolean
        params: Record<string, string | undefined>
    }

}
interface Playlist {
    id: string
    collectionId: string
    collectionName: "playlist"
    created: string
    updated: string
    title: string
    description: string
    owner: string
}

interface Item {
    id: string
    created: string
    updated: string
    collectionId: string
    collectionName: "item"
    playlist: string
    owner: string
    title: string
    description: string
    content: string
    color: string
    cover: string
    expand?: {playlist: Playlist}
}

interface Question {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    type: "open" | "close"
    question: string
    answears: string
    decoys: string
    item: string
    owner: string
    title: string
    show: "2:1"|"2:2"|"3:1"|"3:2"|"3:3"|"4:1"|"4:2"|"4:3"|"4:4"
}

interface AlertMessage {
    show: boolean
    type: "error" | "success" | ""
    message: string
}