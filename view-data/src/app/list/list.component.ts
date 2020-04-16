import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  albums: Album[];
  sync: boolean;

  constructor( private albumsService: AlbumsService ) {
    this.sync = true;
    this.albumsService.getAlbums().subscribe( data => {
      this.albums = data;
      this.sync = true;
    }, err => this.handledError(err) );
  }
  
  onAlbumChanged(album: Album): void {
    if ( album.id === undefined ) {
      this.albumsService.postAlbum( album ).subscribe( id => {
        album.id = id;
        this.sync = true;
      }, err => this.handledError(err) );
    } else {
      this.albumsService.putAlbum( album ).subscribe( id => {
        album.id = id;
        this.sync = true;
      }, err => this.handledError(err) );
    }
  } 

  addAlbum(): void {
      this.albums.push( new Album() );
  }

  isEmpty( album: Album ): boolean {
    return album.author === undefined && album.title === undefined;
  }

  refresh() {
    this.albumsService.getAlbums().subscribe( data => {
      this.albums = data;
      this.sync = true;
    }, err => this.handledError(err) );
  }
  handledError(error) {
    this.sync = false;
  }

}
