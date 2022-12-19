import { Component } from '@angular/core';
import { GPU } from './gpu';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'GPU-Value-Website';
  gpus?: GPU[];
  sortedGpus?: GPU[];
  sortedFilteredGpus?: GPU[];
  filterstring?: string;
  selectedIndex: number = 0;

  brandSort: boolean = false;
  performanceSort: boolean = false;
  priceSort: boolean = false;
  valueSort: boolean = false;

  sortColumn?: string;

  settings : string[] = [
    "1080p Medium",
    "1080p Ultra",
    "1440p Ultra",
    "4K Ultra",
  ]

  getGpusFromJson(data: any): GPU[] {
    const result = JSON.stringify(data)
    
    return JSON.parse(result);
  }

  getInitialData(): void {
    const request = this.http.get('http://127.0.0.1:5000/gpus');

    request.subscribe( data => {
      this.gpus = this.getGpusFromJson(data);
      this.sortedGpus = this.gpus.filter((gpu) => {
        return gpu.price != 0;
      });
      this.sortedFilteredGpus = this.sortedGpus;
    });
  }
  
  filterList(){
    this.sortedFilteredGpus = this.sortedGpus?.filter((gpu) => {
      if (this.filterstring != null && this.filterstring != ''){
        return gpu.name.includes(this.filterstring);
      }
      else {
        return true;
      }
    })
  }

  onKey(event: any) {
    this.filterList();
  }

  sortBrand(){
    this.sortedGpus = this.gpus?.sort((a, b) => compare(a.brand, b.brand, this.brandSort))
    this.brandSort = !this.brandSort;
    this.sortColumn = 'Brand';
  }

  sortPerormance(){
    if (this.selectedIndex === 0){
      this.sortedGpus = this.gpus?.sort((a, b) => compare(Math.floor(a.tenMedium), Math.floor(b.tenMedium), this.performanceSort))
    }
    if (this.selectedIndex === 1){
      this.sortedGpus = this.gpus?.sort((a, b) => compare(Math.floor(a.tenUltra), Math.floor(b.tenUltra), this.performanceSort))
    }
    if (this.selectedIndex === 2){
      this.sortedGpus = this.gpus?.sort((a, b) => compare(Math.floor(a.twoKUltra), Math.floor(b.twoKUltra), this.performanceSort))
    }
    if (this.selectedIndex === 3){
      this.sortedGpus = this.gpus?.sort((a, b) => compare(Math.floor(a.fourKUltra), Math.floor(b.fourKUltra), this.performanceSort))
    }
    this.performanceSort = !this.performanceSort;
    this.sortColumn = 'Performance';
  }

  sortPrice(){
    this.sortedGpus = this.gpus?.sort((a, b) => compare(a.price, b.price, this.priceSort))
    this.priceSort = !this.priceSort;
    this.sortColumn = 'Price';
  }

  sortValue(){
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
    this.sortColumn = 'Value';
  }

  sortData(sortOn: string){
    switch(sortOn){
      case 'Brand':
        this.sortBrand();
        break;
      case 'Performance':
        this.sortPerormance();
        break;
      case 'Price':
        this.sortPrice();
        break;
      case 'Value':
        this.sortValue();
        break;
    }
    this.sortedGpus = this.sortedGpus?.filter((gpu) => {
      return gpu.price != 0;
    })
    this.filterList()
  }

  constructor(private http: HttpClient) {
    this.getInitialData();
  }


  onSelect(idx: number): void {
    this.selectedIndex = idx;
    if (this.sortColumn !== undefined){
      this.sortData(this.sortColumn);
    }
  }
}



function compare(a: number | string, b: number | string, isAsc: boolean) {  
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}