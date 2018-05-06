import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared-services/http.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  private newRecord: object = {};

  constructor(private http: HttpService, private router:Router) { }

  ngOnInit() {
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
    //  await this.getBooks();
      this.router.navigate(['']);
    }
  }

}
