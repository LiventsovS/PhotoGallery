import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gallery-lightbox';
  data: Item[] = [];
  baseApiUrl = environment.baseApiUrl;


  ngOnInit() {
    fetch(`${this.baseApiUrl}`)
    .then(response => response.json())
    .then((data) => this.data = this.data.concat(data));
  }
}
