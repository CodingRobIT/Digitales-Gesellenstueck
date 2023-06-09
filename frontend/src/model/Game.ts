export type Game = {
    id: string,
    title: string,
    publisher: string,
    genre: string,
    note: string,
    imageUrl: string,
}
export type NewGame = {
    title: string,
    publisher: string,
    genre: string,
    note: string,
    imageUrl: string,
    userId: string,
}