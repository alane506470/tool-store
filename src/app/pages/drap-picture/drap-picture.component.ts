import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-drap-picture',
  templateUrl: './drap-picture.component.html',
  styleUrls: ['./drap-picture.component.css']
})
export class DrapPictureComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  // uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

  constructor() {

   }

  ngOnInit(): void {
  }

  fileChange(files) {
    console.log(files);
    if (files.length === 0) {
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    console.log(files[0]);
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
