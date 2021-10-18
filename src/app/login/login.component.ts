import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isLoginProcess = false;
  errorMessage = '';
  currentUser: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private activeRouter: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    const token: string | null = this.activeRouter.snapshot.queryParamMap.get('JWT');
    const error: string | null = this.activeRouter.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    } else if (token) {
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  login(user: any): void {
    this.isLoginProcess = true;
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.currentUser = this.tokenStorage.getUser();
    this.isLoggedIn = true;
    window.location.href = '/';
  }
}
