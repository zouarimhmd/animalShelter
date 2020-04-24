import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  @ViewChild(UploadFilesComponent, {static: false}) uploadFileComponent : UploadFilesComponent;
  myDatePicker : MatDatepicker<any>;
  sexes: string[] = ['H', 'F'];
  registerForm =  new FormGroup({
    email: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    name : new FormControl('',Validators.required),
    lastname : new FormControl('',Validators.required),
    passwordConfirm : new FormControl('',Validators.required),
    birthDate : new FormControl('',Validators.required),
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
