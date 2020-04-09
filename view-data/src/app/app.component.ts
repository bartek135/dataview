import { Component } from '@angular/core';
import { Album, Genre } from './models/album';
import { AlbumsService } from './services/albums.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'view-data';

  albums: Album[];


  constructor( private albumsService: AlbumsService ) {

    this.albumsService.getAlbums().subscribe( data => {
      this.albums = data;
    });
  }

  onAlbumChanged(album: Album): void {
    if ( album.id === undefined ) {
      this.albumsService.postAlbum( album ).subscribe( id => {
        album.id = id;
      });
    } else {
      this.albumsService.putAlbum( album ).subscribe( id => {
        album.id = id;
      });
    }
  } 

  addAlbum(): void {
      this.albums.push( new Album() );
  }

  isEmpty( album: Album ): boolean {
    return album.author === undefined && album.title === undefined;
  }

}
