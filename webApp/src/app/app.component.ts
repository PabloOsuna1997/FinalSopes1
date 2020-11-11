import { error } from '@angular/compiler/src/util';
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
  nameUserLogin: String;
  server: Number;

  constructor(private service: UserService) {}
  ngOnInit() {
    this.nameUserLogin = '';
    this.server = 1;
    this.loginBool = false;
    this.selectUserLogin = new User();
    this.selectUserRegistrer = new User();
  }

  loginUser(form?: NgForm) {
    localStorage.clear();
    this.service.userLogin(form.value).subscribe((res) => {
      localStorage.setItem('usuario', JSON.stringify(res));
      this.nameUserLogin = JSON.parse(localStorage.getItem('usuario')).user;
      this.resetForm(form);
      this.peticiones();
      setInterval(() => {
        this.peticiones();
      }, 5000);
    });
  }

  registrerUser(form?: NgForm) {
    this.service.userRegistrer(form.value).subscribe((res) => {
      this.resetForm(form);
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.selectUserRegistrer = new User();
    }
  }

  peticiones() {
    this.service.serverCurrent().subscribe((res) => {
      console.log(res);
    });
  }
}
