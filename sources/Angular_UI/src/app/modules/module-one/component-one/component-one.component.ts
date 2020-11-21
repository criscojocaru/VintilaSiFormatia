import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { HttpService } from '../../../core/http/http.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss'],
})
export class ComponentOneComponent implements OnInit {
  message: string;
  user: User;

  constructor(public dialog: MatDialog, public service: HttpService) {}

  ngOnInit(): void {}

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      maxWidth: '600px',
      data: {
        title: 'Upload Dataset',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.response) {
          const files = dialogResult.files;
          console.log(files);
          if (files.length > 0) {
            this.service.uploadDataset(files[0]).subscribe((results) => {
              console.log(results);
            });
          }
          return;
        }
      }
    });
  }
}
