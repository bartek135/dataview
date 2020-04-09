export enum Genre {
    ROCK, POP, FUNK, JAZZ, RAP
}

export class Album {
    
    id: number;

    title: string;
    author: string;
    year: number;
    genre: Genre;

    constructor( id?: number, title?: string, author?: string, year?: number, genre?: Genre ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }

}