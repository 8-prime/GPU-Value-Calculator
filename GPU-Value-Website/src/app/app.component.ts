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
    const request = this.http.get('http://gpuprice.ddns.net:5000/gpus');

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
        return gpu.name.toLowerCase().includes(this.filterstring);
      }
      else {
        return true;
      }
    })
  }

  onKey(event: any) {
    this.filterList();
  }

  sortBrand(switchOrientation?: boolean){
    if (this.sortColumn === 'Brand' && switchOrientation){
      this.brandSort = !this.brandSort;
    }
    this.sortedGpus = this.gpus?.sort((a, b) => compare(a.brand, b.brand, this.brandSort))
  }

  sortPerormance(switchOrientation?: boolean){
    if (this.sortColumn === 'Performance' && switchOrientation){
      this.performanceSort = !this.performanceSort;
    }

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
  }

  sortPrice(switchOrientation?: boolean){
    if (this.sortColumn === 'Price' && switchOrientation){
      this.priceSort = !this.priceSort;
    }

    this.sortedGpus = this.gpus?.sort((a, b) => compare(a.price, b.price, this.priceSort))
  }

  sortValue(switchOrientation?: boolean){
    if (this.sortColumn === 'Value' && switchOrientation){
      this.valueSort = !this.valueSort;
    }

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
  }

  sortData(sortOn: string, switchOrientation?: boolean){
    if (switchOrientation == null){
      switchOrientation = true;
    }
    switch(sortOn){
      case 'Brand':
        this.sortBrand(switchOrientation);
        break;
      case 'Performance':
        this.sortPerormance(switchOrientation);
        break;
      case 'Price':
        this.sortPrice(switchOrientation);
        break;
      case 'Value':
        this.sortValue(switchOrientation);
        break;
    }

    this.sortColumn = sortOn;

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
      this.sortData(this.sortColumn, false);
    }
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {  
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}