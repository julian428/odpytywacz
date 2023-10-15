export interface questionType {
    answears: string
    collectionId: string
    collectionName: string
    created: string
    decoys: string
    id: string
    item: string
    owner: string
    question: string
    show: "0:0"|'2:1'|'2:2'|'3:1'|'3:2'|'3:3'|'4:1'|'4:2'|'4:3'|'4:4'
    type: "open" | "closed"
    updated: string
}

export interface itemType {
    questions: questionType[]
    collectionId: string
    color: string
    content: string
    cover: string
    created: string
    description: string
    id: string
    owner: string
    playlist: string
    title: string
    type: "quiz" | "article"
    updated: string
}