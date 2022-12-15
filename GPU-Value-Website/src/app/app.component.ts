import { Component } from '@angular/core';
import { GPU } from './gpu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GPU-Value-Website';

  selectedIndex: number = 0;

  onSelect(idx: number): void {
    this.selectedIndex = idx;
    console.log(this.selectedIndex);    
  }


  gpus: GPU[] = [
    new GPU("RTX 3070", 700, 120, "700/120", "Nvidia"),
    new GPU("RTX 4070", 1200, 160, "1200/160",  "Nvidia"),
    new GPU("RTX 4090", 2000, 200, "2000/200",  "Nvidia"),
    new GPU("RADEON RX 7900 XTX", 30, 400, "30/400", "Amd"),
    new GPU("Intel Arc 750", 100, 100, "100/100", "Intel"),
  ]

  settings : string[] = [
    "1080p Medium",
    "1080p Ultra",
    "1440p Ultra",
    "4K Ultra",
  ]
}
