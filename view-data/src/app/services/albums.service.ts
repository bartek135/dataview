import { Injectable } from '@angular/core';
import { Album, Genre } from '../models/album';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.url}/albums`);
  }

  getAlbum( id: number ): Observable<Album> {
    return this.http.get<Album>(`${this.url}/albums/${id}`);
  }

  postAlbum( album: Album ): Observable<number> {
    return this.http.post<any>(`${this.url}/albums`, album).pipe(
      map( res => {
        return res.id;
      })
    )
  }

  putAlbum( album: Album ): Observable<number> {
    const id = album.id;

    return this.http.put<any>(`${this.url}/albums/${id}`, album).pipe(
      map( res => {
        return res.id;
      } )
    )
  }
  
  deleteAlbum( album: Album ): Observable<string> {
    const id = album.id;

    return this.http.delete<any>(`${this.url}/albums/${id}`).pipe(
      map( res => {
        return res.message;
      })
    )
  }

}
