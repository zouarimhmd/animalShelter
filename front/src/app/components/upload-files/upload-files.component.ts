import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { map, tap } from "rxjs/operators";
import { NewFile } from 'src/app/models/newFile';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})

export class UploadFilesComponent implements OnInit {

  @Input('fileName') fileName: string;

  selectedFiles: FileList;
  currentFile: File;

  progress = 0;
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event) {
    this.progress = 0;
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile);
    this.progress = Math.round(100 * event.loaded / event.total);
    this.progress = 100;
    this.message = 'File uploaded successfully !'
  }

  upload(fileName: string) {
    console.log(fileName);
    this.currentFile.name
    this.uploadService.upload(this.currentFile, fileName).subscribe(
      event => {
        // if (event.type === HttpEventType.UploadProgress) {
        //   this.progress = Math.round(100 * event.loaded / event.total);
        // } else 
        if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}



