import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  @ViewChild(UploadFilesComponent, {static: false}) uploadFileComponent : UploadFilesComponent;

  registerForm =  new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.register(this.registerForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.uploadFileComponent.upload(this.registerForm.controls.username.value);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
