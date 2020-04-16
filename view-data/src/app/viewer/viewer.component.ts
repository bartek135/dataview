import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../models/album';
import { AlbumsService } from '../services/albums.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'application-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  @Input() album: Album;
  @Input() edit: boolean;

  @Output() albumChanged = new EventEmitter<Album>();

  editing = false;

  constructor(
    private albumsService: AlbumsService,
    private activedRoute: ActivatedRoute ) { }

  getAlbum() {
    const id=+this.activedRoute.snapshot.paramMap.get('id');
    this.albumsService.getAlbum(id).subscribe(album => {
      this.album = album;
    });
  }

  ngOnInit(): void {
    this.editing = this.edit;

    this.getAlbum();
  }

  onSave(): void {
    this.editing =false;
    this.albumChanged.emit( this.album );
  }

  onEdit(): void {
    this.editing = true;
  }

}
