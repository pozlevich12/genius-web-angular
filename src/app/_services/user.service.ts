import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})

};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    console.log('getting user');
    return this.http.get(AppConstants.API_BASE_URL + 'profile', httpOptions);
  }

 /* getLoginInfo(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'user', httpOptions);
    return this.http.get(AppConstants.GOOGLE_AUTH_URL, httpOptions);
  }*/

}
