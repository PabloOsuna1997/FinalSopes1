import { error } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './models/user';
import { Message } from './models/message';
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
  selectMessage: Message;
  messages:Message[];
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
    this.selectMessage = new Message();
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
    this.service.getMesages().subscribe((res) => {
      this.messages = res;
    });
  }

  insertNote(form?: NgForm) {
    form.value.user = JSON.parse(localStorage.getItem('usuario')).user;
    this.service.messageRegistrer(form.value).subscribe((res) => {
      this.resetForm(form);
    });
  }
}
