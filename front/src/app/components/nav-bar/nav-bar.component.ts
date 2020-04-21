import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  navBarOptions = [{view :'Home', viewValue : '/home'}, {view :'About', viewValue : '/about'}, {view :'Adoptions', viewValue : '/adoptions'},
   {view :'Contact', viewValue : '/contact'}];

  constructor(private tokenStorageService : TokenStorageService, private uploadFileService : UploadFileService ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    this.uploadFileService.getFiles();
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
