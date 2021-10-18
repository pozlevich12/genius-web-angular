import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../common/app.constants";
import { NewTask } from '../common/new.task';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})

};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getAddTaskParam(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'add', {responseType: 'text'});
  }

  addTask(newTask: NewTask): Observable<NewTask> {
    return this.http.post<NewTask>(AppConstants.API_BASE_URL + 'addtask', newTask, httpOptions);
  }

}
