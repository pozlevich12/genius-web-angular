import {Injectable} from '@angular/core';

const TOKEN_KEY = 'JWT';
const USER_KEY = 'current-user';
const ADD_TASK_PARAM = 'add-task-param';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();

  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveAddTaskParam(addTaskParam: any): void {
    window.sessionStorage.removeItem(ADD_TASK_PARAM);
    window.sessionStorage.setItem(ADD_TASK_PARAM, addTaskParam);
  }

  public getAddTaskParam(): any {
    return JSON.parse(<string>sessionStorage.getItem(ADD_TASK_PARAM));
  }

  public getUser(): any {
    return JSON.parse(<string>sessionStorage.getItem(USER_KEY));
  }
}
