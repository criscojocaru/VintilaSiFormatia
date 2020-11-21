import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { HttpService } from '../../../core/http/http.service';
import { EvaluateResponse } from '../../../shared/models/evaluate-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConfusionMatrix } from '../../../shared/models/confusion-matrix.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss'],
})
export class ComponentOneComponent implements OnInit {
  evaluateComplete: Boolean = false;
  evaluateResponse: EvaluateResponse = null;
  displayedColumns: String[] = ['type', 'truePositives', 'falseNegatives'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<ConfusionMatrix>();

  constructor(public dialog: MatDialog, public service: HttpService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ConfusionMatrix>();
  }

  toCamel(s: string) {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  keysToCamel(o: any) {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      Object.keys(o).forEach((k) => {
        n[this.toCamel(k)] = this.keysToCamel(o[k]);
      });
      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToCamel(i);
      });
    }
    return o;
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      maxWidth: '600px',
      data: {
        title: 'Upload Dataset',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.evaluateResponse = null;
      this.evaluateComplete = false;
      if (dialogResult) {
        if (dialogResult.response) {
          const files = dialogResult.files;
          console.log(files);
          if (files.length > 0) {
            this.service
              .uploadDataset(files[0])
              .subscribe((response: EvaluateResponse) => {
                this.evaluateResponse = this.keysToCamel(
                  response
                ) as EvaluateResponse;

                const confusionMatrix: ConfusionMatrix[] = [];
                confusionMatrix.push({
                  type: 'Negative',
                  truePositives: this.evaluateResponse.testResult.confusionMatrix[1][1],
                  falseNegatives: this.evaluateResponse.testResult
                    .confusionMatrix[1][2],
                });
                confusionMatrix.push({
                  type: 'Positive',
                  truePositives: this.evaluateResponse.testResult.confusionMatrix[2][2],
                  falseNegatives: this.evaluateResponse.testResult
                    .confusionMatrix[2][1],
                });
                this.dataSource = new MatTableDataSource<ConfusionMatrix>();
                this.dataSource.data = confusionMatrix;
                this.dataSource.sort = this.sort;

                this.evaluateComplete = true;
              });
          }
          return;
        }
      }
    });
  }
}
