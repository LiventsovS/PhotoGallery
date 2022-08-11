import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comments } from '../models/comments';

export interface PostComment {
  name: string;
  comment: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comments[] = [];
  @Input() imageId: number = 0;
  @Input() reply: string = '';

  commentPost: PostComment = {
    name: '',
    comment: ''
  }
  baseApiUrl: string = environment.baseApiUrl;

  constructor() { }

  ngOnInit(): void {
    console.log(this.imageId);
  }

  submitComment() {
    this.commentPost.name = 'GetRequest_WithoutName_Sorry';
    this.commentPost.comment = this.reply;

    fetch(`${this.baseApiUrl}${this.imageId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.commentPost)})
      .then((response) => {
        if (this.reply != "") {
          this.reply = "";
          console.log(response);
      }})
      .catch((error) => console.log(error));
  }
}

