import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './models/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'webApp';
  selectUserLogin: User;
  selectUserRegistrer: User;
  loginBool: Boolean;

  constructor(private service: UserService) {}
  ngOnInit() {
    this.loginBool = false;
    this.selectUserLogin = new User();
    this.selectUserRegistrer = new User();
  }

  loginUser(form?: NgForm) {
    this.service.userLogin(form.value).subscribe((res) => {
      console.log(res)
      this.resetForm(form);
    });
  }

  registrerUser(form?: NgForm) {
    this.service.userRegistrer(form.value).subscribe((res) => {
      console.log(res)
      this.resetForm(form);
    });
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      this.selectUserRegistrer = new User();
    }
  }
}
