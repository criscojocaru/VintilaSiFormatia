import { Component, OnInit } from '@angular/core';
import { TestserviceService } from '../../../core/http/testrest/testservice.service';
import { User } from '../../../shared/models/user';
import { GraphService } from '../../../core/graph.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss'],
})
export class ComponentOneComponent implements OnInit {
  message: string;
  user: User;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      maxWidth: '600px',
      data: {
        title: 'Upload Dataset'
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        return;
      }
    });
  }
}
