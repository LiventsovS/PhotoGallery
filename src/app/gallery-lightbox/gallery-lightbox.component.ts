import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comments } from '../models/comments';
import { Item } from '../models/item';

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])
  ]
})
export class GalleryLightboxComponent implements OnInit {
  @Input() galleryData: Item[] = [];
  @Input() showCount = false;

  previewImage = false;
  showMask = false;
  currentLightboxImage: Item = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;
  comments: Comments[] = [];
  baseApiUrl: string = environment.baseApiUrl;

  constructor() { }

  ngOnInit(): void {

  }

  onPreviewImage(index: number, id: number): void {
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];

    fetch(`${this.baseApiUrl}${id}`)
    .then(response => response.json())
    .then(data => {
      for(let i = 0; i < data.comments.length; i++) {
        if(data.comments !== undefined) {
          this.comments[i] = data.comments[i];
        }
      };
    });
  }

  onAnimationEnd(event: AnimationEvent) {
    if(event.toState === 'void') {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.previewImage = false;
    this.comments = [];
    this.currentLightboxImage = {id: 0, url: ''};
  }
}
