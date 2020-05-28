import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'app/http-service/http-service.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
// import { ScrollbarDirective } from 'app/shared/scrollbar/scrollbar.directive';
import { MediaObserver } from '@angular/flex-layout';
import sortBy from 'lodash-es/sortBy';
import { map, takeUntil } from 'rxjs/operators';
import { chatDemoData } from './chat.demo';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {

  isLogin = '請先登入'
  videoStream_path = 'http://127.0.0.1:4000/video_feed';
  videoStream$: Observable<Blob>;
  registered_path = 'http://127.0.0.1:4000/saveface';
  get_user_path = 'http://127.0.0.1:5000/get_users';
  name: any;
  chats: any[] = [];
  offlinechats: any[];
  activeChat: any;
  chatDemoData = [];

  replyCtrl: FormControl;

  // @ViewChild('messagesScroll', { read: ScrollbarDirective, static: true }) messagesScroll: ScrollbarDirective;

  constructor( private httpClient: HttpClient, private cd: ChangeDetectorRef,
    private mediaObserver: MediaObserver, private _sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    // this.getImage();
    this.replyCtrl = new FormControl();
    this.initChat()
    // this.offlinechats = sortBy(chatDemoData, 'lastMessageTime').reverse();
  }
  initChat() {
    this.httpClient.get(this.get_user_path).subscribe((data: Array<any>) => {
      // console.log(data)

      data.forEach((fileInfo) => {
        // console.log(fileInfo)
        const temp: chatInfo = {
          name: '',
          picture: '',
          messages: [],
          islogin: '離線',
        lastMessage: '',
        lastMessageTime: moment().subtract(170, 'minutes'),
        };
        temp.name = fileInfo.name;
        temp.picture = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + fileInfo.image)
        // console.log(temp)
        this.chatDemoData.push(temp);
      })
      // console.log(this.chatDemoData)
      this.offlinechats = sortBy(this.chatDemoData, 'lastMessageTime').reverse();
      this.activeChat = this.offlinechats[0];
    })

  }
  // getImage() {
  //   this.videoStream$ = this.httpClient.get(this.videoStream_path, { responseType: 'blob' })
  // }

  registered() {
    console.log(this.name);
    const data = {'name': this.name}
    this.httpClient.post(this.registered_path, data).subscribe({next: (result: any) => {
      console.log(result);
      if (result.message === 'success') {
        this.isLogin = '註冊成功，請登入'
      } else {
        this.isLogin = '註冊失敗'
      }
      this.initChat();
      this.name = ''
    }
  })
  }

  recog() {
    const data = {};
    this.httpClient.post(this.registered_path, null).subscribe({next: (result: any) => {
      console.log(result);
      if (result) {
        const index = this.offlinechats.findIndex((chat) => chat.name === result)
        console.log(this.offlinechats[index].islogin)
        this.offlinechats[index].islogin = '上線中';
        this.chats.push(this.offlinechats[index]);
        this.setActiveChat(this.offlinechats[index]);
        this.offlinechats.splice(index, 1);
        this.isLogin = '登入成功: ' + result;
      } else {
        this.isLogin = '登入失敗';
      }
    }
  })
  }

  hide() {

  }

  // 聊天室

  send() {
    if (this.replyCtrl.value) {
      this.offlinechats[0].messages.push({
        message: this.replyCtrl.value,
        when: moment(),
        who: 'me'
      });

      this.replyCtrl.reset();
      // this.cd.markForCheck();
      // setTimeout(() => {
      // tslint:disable-next-line: max-line-length
      //   this.messagesScroll.scrollbarRef.getScrollElement().scrollTo(0, this.messagesScroll.scrollbarRef.getScrollElement().scrollHeight);
      // }, 10);
    }

}

setActiveChat(chat) {
  this.activeChat = chat;

  // if (this.drawerMode === 'over') {
  //   this.drawerOpen = false;
  // }
}
}

interface chatInfo {
  picture: any;
  name: string;
  messages: Array<message>;
  lastMessage: string;
  lastMessageTime;
  islogin: string;
}

interface message {
  message: string;
  when?: any;
  who: string;
}
