import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared-services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private auth: object = {};
  private errCount: number = 0;
  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  private async login(auth: any) {
    console.log('login fired.....', auth);
    const user: any = await this.http.post('users/login', auth);

    console.log('resp from server user: ', user);
    if (user.errorMessage) {
      this.errCount++;
      console.log('login error.....', user.errorMessage);
      if (this.errCount === 5) {
        this.router.navigate(['not-found']);
      }
    } else if (user.length > 0) {
      this.errCount = 0;
      console.log('login success, here is the user...', user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['']);
    }
  }

}
