import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.css']
})
export class SortArrowComponent implements OnInit {

  @Input()
  sortDesc?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
