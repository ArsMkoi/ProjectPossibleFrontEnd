import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private _title = 'TestApp';
  //private myArr2:Object[] = [];
  constructor() {
    // setup
  }

  async ngOnInit() {
    console.log('angular initializing..');
  
  }

  private get title() {
    return this._title;
  }

  private set title(title: any) {
    this._title = title;
  }
}
