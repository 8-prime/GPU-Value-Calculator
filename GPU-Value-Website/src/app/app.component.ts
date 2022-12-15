import { Component } from '@angular/core';
import { GPU } from './gpu';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  gpus?: GPU[];


  getGpusFromJson(data: any): GPU[] {
    const result = JSON.stringify(data)
    
    return JSON.parse(result);
  }


  getInitialData(): void {
    const request = this.http.get('http://127.0.0.1:5000/gpus');

    request.subscribe( data => {
      this.gpus = this.getGpusFromJson(data);
    } );
  }


  constructor(private http: HttpClient) {
    this.getInitialData();
  }

  title = 'GPU-Value-Website';

  selectedIndex: number = 0;

  onSelect(idx: number): void {
    this.selectedIndex = idx;
    console.log(this.selectedIndex);    
  }

  settings : string[] = [
    "1080p Medium",
    "1080p Ultra",
    "1440p Ultra",
    "4K Ultra",
  ]
}
