import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../models/album';

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

  constructor() { }

  ngOnInit(): void {
    this.editing = this.edit;
  }

  onSave(): void {
    this.editing =false;
    this.albumChanged.emit( this.album );
  }

  onEdit(): void {
    this.editing = true;
  }

}
