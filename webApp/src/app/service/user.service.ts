import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'http://localhost:3000/user/'
  constructor(private http: HttpClient) { }

  userRegistrer(user: User){
    return this.http.post(this.url + 'registrer', user);
  }

  messageRegistrer(message: Message){
    return this.http.post(this.url + 'message', message);
  }

  userLogin(user: User){
    return this.http.post(this.url + 'login', user);
  }

  serverCurrent(){
    return this.http.get('http://localhost:3000/server');
  }

  getMesages(){
    return this.http.get<[]>('http://localhost:3000/messages');
  }
}
