import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AppConstants} from "./common/app.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private roles: string[] = ['ROLE_USER'] ;
  isLoggedIn = false;
  showAdminBoard = false;
  username: string = 'User';
  avatarUrl: string = '';
  closeResult: string | undefined;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  azureURL = AppConstants.AZURE_AUTH_URL;

  constructor(private modalService: NgbModal, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void{

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
      this.avatarUrl = user.avatarUrl;
    }
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
