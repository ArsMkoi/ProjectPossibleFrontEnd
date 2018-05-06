import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared-services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private myArr: Array<object> = [];
  private shouldShowRed: boolean = false;
  private pStyle: object = {};
  private newRecord: object = {};
  private currentUser: any;

  private books: any;
  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  async ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('this.currentUser', this.currentUser[0]._id);
    this.books = await this.http.post('books/get-all-books-for-user', { userID: this.currentUser[0]._id });
    console.log('this.books from main component. ', this.books);
    this.pStyle = {
      "color": "blue"
    };
    // let test: any = await this.http.get('books/id/5acd38fd47036216c4d6d176');
    // console.log('test--->', test);
    await this.getBooks();
  }

  async getBooks() {
    this.myArr = await this.http.get('books');
    this.myArr = await this.http.get('books');
    console.log('myArray--->', this.myArr);
  }

  toggleClass() {
    console.log('toggle button pressed...');
    this.shouldShowRed = !this.shouldShowRed;
    return this.shouldShowRed;
  }

  async remove(id: any) {
    // this.myArr.splice(index, 1);
    console.log('id from remove: ID', id);
    let resp: any = await this.http.remove('books', id);
    console.log('resp from remove .... resp" ', resp);
    if (resp) {
      console.log('from if statement...');
      this.getBooks();
    }


  }

  update(record) {
    this.newRecord = record;
  }

  async addRecord(record?: any) {
    let payload: any = {}, resp;
    payload = {
      title: record ? record.title : 'default',
      genre: record ? record.genre : 'default',
      author: record ? record.author : 'default',
      read: false
    }

    if (record._id) {
      // do update
      resp = await this.http.update(`books/id/${record._id}`, payload);
    } else {
      // do create
      console.log('payload from addRecord ', payload);
      // this.myArr.unshift(r);
      resp = await this.http.post('books', payload);
      console.log('resp from after posting the book', resp);
    }
    if (resp) {
      await this.getBooks();
    }
  }

  goToBookCreate() {
    this.router.navigate(['book-create']);
  }


}
