import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../models/album';
import { AlbumsService } from '../services/albums.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'application-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  @Input() album: Album;
  @Input() edit: boolean;


  editing = false;

  constructor(
    private albumsService: AlbumsService,
    private activedRoute: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService  ) { }

  getAlbum() {
    const id=+this.activedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.albumsService.getAlbum(id).subscribe(album => {
        this.album = album;
      });
    } else {
      this.editing = true;
      this.album = new Album;
    }
  }

  ngOnInit(): void {
    this.editing = this.edit;

    this.getAlbum();
  }

  onSave(): void {
    this.editing =false;
    if ( this.album.id === undefined ) {
      this.albumsService.postAlbum( this.album ).subscribe( id => {
        this.album.id = id;
       } );
    } else {
      this.albumsService.putAlbum( this.album ).subscribe( id => {
        this.album.id = id;
       } );
    }
  }

  onEdit(): void {
    this.editing = true;
  }

  onBack(): void {
    this.location.back();
  }

  onDelete(): void {
    this.albumsService.deleteAlbum( this.album ).subscribe( status => {
      this.toastr.info("Usunięto");
    this.location.back();
    });
  }
}
