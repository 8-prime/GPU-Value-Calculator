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
  sortedGpus?: GPU[];


  getGpusFromJson(data: any): GPU[] {
    const result = JSON.stringify(data)
    
    return JSON.parse(result);
  }


  getInitialData(): void {
    const request = this.http.get('http://127.0.0.1:5000/gpus');

    request.subscribe( data => {
      this.gpus = this.getGpusFromJson(data);
      this.sortedGpus = this.gpus;
    } );
  }



  brandSort: boolean = false;
  performanceSort: boolean = false;
  priceSort: boolean = false;
  valueSort: boolean = false;


  sortData(sortOn: string){
    switch(sortOn){
      case 'Brand':
        this.sortedGpus = this.gpus?.sort((a, b) => compare(a.brand, b.brand, this.brandSort))
        this.brandSort = !this.brandSort;
        break;
      case 'Performance':
        if (this.selectedIndex === 0){
          this.sortedGpus = this.gpus?.sort((a, b) => compare(a.tenMedium, b.tenMedium, this.performanceSort))
        }
        if (this.selectedIndex === 1){
          this.sortedGpus = this.gpus?.sort((a, b) => compare(a.tenUltra, b.tenUltra, this.performanceSort))
        }
        if (this.selectedIndex === 2){
          this.sortedGpus = this.gpus?.sort((a, b) => compare(a.twoKUltra, b.twoKUltra, this.performanceSort))
        }
        if (this.selectedIndex === 3){
          this.sortedGpus = this.gpus?.sort((a, b) => compare(a.fourKUltra, b.fourKUltra, this.performanceSort))
        }
        this.performanceSort = !this.performanceSort;
        break;
      case 'Price':
        this.sortedGpus = this.gpus?.sort((a, b) => compare(a.price, b.price, this.priceSort))
        this.priceSort = !this.priceSort;
        break;
      case 'Value':
        if (this.selectedIndex === 0){
          this.sortedGpus = this.gpus?.sort((a, b) => compare((a.tenMedium / a.price), (b.tenMedium / b.price), this.valueSort))
        }
        if (this.selectedIndex === 1){
          this.sortedGpus = this.gpus?.sort((a, b) => compare((a.tenUltra / a.price), (b.tenUltra / b.price), this.valueSort))
        }
        if (this.selectedIndex === 2){
          this.sortedGpus = this.gpus?.sort((a, b) => compare((a.twoKUltra / a.price), (b.twoKUltra / b.price), this.valueSort))
        }
        if (this.selectedIndex === 3){
          this.sortedGpus = this.gpus?.sort((a, b) => compare((a.fourKUltra / a.price), (b.fourKUltra / b.price), this.valueSort))
        }
        this.valueSort = !this.valueSort;
        break;
    }
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



function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}