import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ThrowStmt } from '@angular/compiler';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  imageToShow: any;

  private roles: string[];
  filePath: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  $fileInfos: Observable<any>;
  retrievedImage: any;
  isImageLoading: boolean;
  messages: any[] = [];
  subscription: Subscription;

  navBarOptions = [{ view: 'Home', viewValue: '/home' }, { view: 'About', viewValue: '/about' }, { view: 'Adoptions', viewValue: '/adoptions' },
  { view: 'Contact', viewValue: '/contact' }];

  constructor(private tokenStorageService: TokenStorageService,
    private uploadFileService: UploadFileService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService) {

  }


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.filePath = this.username + '.jpg';
      this.uploadFileService.getFileByFileName(this.filePath).subscribe((blob: any) => {
        let objectURL = URL.createObjectURL(blob);
        this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
