import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'app/http-service/http-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {

  isLogin = '登入失敗'
  videoStream_path = 'http://127.0.0.1:4000/video_feed';
  videoStream$: Observable<Blob>;
  registered_path ='http://127.0.0.1:4000/saveface'
  constructor( private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.videoStream$ = this.httpClient.get(this.videoStream_path, { responseType: 'blob' })
  }

  registered() {
    const data = {'name': '陳凱文'};
    this.httpClient.post(this.registered_path, data).subscribe({next: (result: any) => {
      console.log(result);
      this.isLogin = result;
    }
  })
  }

  recog() {
    const data = {};
    this.httpClient.post(this.registered_path, null).subscribe({next: (result: any) => {
      console.log(result);
      this.isLogin = result;
    }
  })
  }
}
