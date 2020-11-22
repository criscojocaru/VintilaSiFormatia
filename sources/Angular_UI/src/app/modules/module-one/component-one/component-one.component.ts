import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { HttpService } from '../../../core/http/http.service';
import { EvaluateResponse } from '../../../shared/models/evaluate-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConfusionMatrix } from '../../../shared/models/confusion-matrix.model';
import { MatSort } from '@angular/material/sort';
import { SpecificData } from '../../../shared/models/specific-data.model';
import { Prediction } from '../../../shared/models/prediction.model';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss'],
})
export class ComponentOneComponent implements OnInit {
  evaluateComplete: Boolean = false;
  evaluateResponse: EvaluateResponse = null;
  displayedColumnsGeneral: String[] = [
    'type',
    'truePositives',
    'falseNegatives',
  ];
  displayedColumnsSpecific: String[] = [
    'type',
    'accuracy',
    'precision',
    'recall',
    'f1',
  ];
  displayedColumnsPrediction: String[] = [
    'age',
    'gender',
    'prediction',
    'probability',
  ];
  @ViewChild('genSort') set genMatSort(sort: MatSort) {
    this.dataSourceGeneral.sort = sort;
  }
  @ViewChild('specSort') set specMatSort(sort: MatSort) {
    this.dataSourceSpecific.sort = sort;
  }
  @ViewChild('resSort') set resMatSort(sort: MatSort) {
    this.dataSourcePrediction.sort = sort;
  }
  dataSourceGeneral = new MatTableDataSource<ConfusionMatrix>();
  dataSourceSpecific = new MatTableDataSource<SpecificData>();
  dataSourcePrediction = new MatTableDataSource<Prediction>();

  constructor(public dialog: MatDialog, public service: HttpService) {}

  ngOnInit(): void {
    this.dataSourceGeneral = new MatTableDataSource<ConfusionMatrix>();
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
                setTimeout(() => {
                  dialogResult.audio.pause();
                  this.evaluateResponse = this.keysToCamel(
                    response
                  ) as EvaluateResponse;

                  const confusionMatrix: ConfusionMatrix[] = [];
                  confusionMatrix.push({
                    type: 'Negative',
                    truePositives: this.evaluateResponse.testResult
                      .confusionMatrix[1][1],
                    falseNegatives: this.evaluateResponse.testResult
                      .confusionMatrix[1][2],
                  });
                  confusionMatrix.push({
                    type: 'Positive',
                    truePositives: this.evaluateResponse.testResult
                      .confusionMatrix[2][2],
                    falseNegatives: this.evaluateResponse.testResult
                      .confusionMatrix[2][1],
                  });
                  this.dataSourceGeneral = new MatTableDataSource<ConfusionMatrix>();
                  this.dataSourceGeneral.data = confusionMatrix;

                  const specificData: SpecificData[] = [];
                  specificData.push({
                    type: 'Negative',
                    accuracy: this.evaluateResponse.testResult.perClassStats[0]
                      .accuracy,
                    precision: this.evaluateResponse.testResult.perClassStats[0]
                      .precision,
                    recall: this.evaluateResponse.testResult.perClassStats[0]
                      .recall,
                    f1: this.evaluateResponse.testResult.perClassStats[0]
                      .f1Score,
                  });
                  specificData.push({
                    type: 'Positive',
                    accuracy: this.evaluateResponse.testResult.perClassStats[1]
                      .accuracy,
                    precision: this.evaluateResponse.testResult.perClassStats[1]
                      .precision,
                    recall: this.evaluateResponse.testResult.perClassStats[1]
                      .recall,
                    f1: this.evaluateResponse.testResult.perClassStats[1]
                      .f1Score,
                  });

                  this.dataSourceSpecific = new MatTableDataSource<SpecificData>();
                  this.dataSourceSpecific.data = specificData;

                  this.dataSourcePrediction = new MatTableDataSource<Prediction>();
                  this.dataSourcePrediction.data = this.evaluateResponse.predictions;

                  this.evaluateComplete = true;
                }, 5000);
              });
          }
          return;
        }
      }
    });
  }
}
