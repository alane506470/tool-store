import { Component, OnInit } from '@angular/core';
import { FileHandle } from 'app/shared/direct/drag-drop.directive';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


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
  images_path = 'https://saveimage-api-0607.herokuapp.com/imageExample';
  recogImage_path = 'https://saveimage-api-0607.herokuapp.com/recog-image'
  rowGroups = [];
  files = [];
  items = [];
  result_name = '暫無相片辨識';
  // readfiles = require('readfiles');
  constructor(private httpClient: HttpClient, private _sanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.httpClient.get(this.images_path).subscribe((data: Array<any>) => {
      data.forEach((fileInfo) => {
        fileInfo.image = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + fileInfo.image)
      })
      const groupsnumber = Math.floor(data.length / 7 + 1);
      for (let i = 1; i <= groupsnumber; i++) {
        this.rowGroups.push(i);
      }
      console.log(this.rowGroups);

      this.items = data;
      console.log(this.items)
    })
  }

  drop(event) {
    this.files = [];
    const url = this._sanitizer.bypassSecurityTrustUrl(event.item.data.changingThisBreaksApplicationSecurity);
    const file = {url: url};
    this.files.push(file);
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
    console.log(this.files);
  }

  upload(file): void {
    // get image upload file obj;
    const data = {'image': file.changingThisBreaksApplicationSecurity};
    this.httpClient.post(this.recogImage_path, data).subscribe({next: (result: any) => {
      console.log(result);
      this.result_name = result
    }
  })
  }

}
