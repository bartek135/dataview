import { Injectable } from '@angular/core';
import { Album, Genre } from '../models/album';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient, private toastr: ToastrService ) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.url}/albums`).pipe(
      catchError( ( err: HttpErrorResponse ) => {
          this.toastr.error("Błąd: " + err.message + " method: GET");
          // alert(`Błąd: ${err.message} method: GET`);
        return throwError( err );
      } )
    );
  }

  getAlbum( id: number ): Observable<Album> {
    return this.http.get<Album>(`${this.url}/albums/${id}`).pipe(
      catchError( err => {
        this.toastr.error("Błąd: " + err.message + " method: GET");
        return throwError( err);
      })
    );
  }

  postAlbum( album: Album ): Observable<number> {
    return this.http.post<any>(`${this.url}/albums`, album).pipe(
      map( res => {
        return res.id;
      }),
      catchError( err => {
        this.toastr.error("Błąd: " + err.message + " method: POST");
        return throwError( err);
      })
    );
  }

  putAlbum( album: Album ): Observable<number> {
    const id = album.id;

    return this.http.put<any>(`${this.url}/albums/${id}`, album).pipe(
      map( res => {
        return res.id;
      } ),
      catchError( err => {
        this.toastr.error("Błąd: " + err.message + " method: PUT");
        return throwError( err);
      })
    );
  }
  
  deleteAlbum( album: Album ): Observable<string> {
    const id = album.id;

    return this.http.delete<any>(`${this.url}/albums/${id}`).pipe(
      map( res => {
        return res.message;
      }),
      catchError( err => {
        this.toastr.error("Błąd: " + err.message + " method: DELETE");
        return throwError( err);
      })
    );
  }

}
