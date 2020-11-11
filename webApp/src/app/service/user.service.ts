import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'http://localhost:3000/user/'
  constructor(private http: HttpClient) { }

  userRegistrer(user: User){
    return this.http.post(this.url + 'registrer', user);
  }

  userLogin(user: User){
    return this.http.post(this.url + 'login', user);
  }

  serverCurrent(){
    return this.http.get('http://localhost:3000/server');
  }
}
