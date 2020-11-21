import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ModuleOneComponent } from './module-one.component';

import { ModuleOneRouting } from './module-one.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { DndDirective } from './upload-dialog/dnd.directive';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    ModuleOneComponent,
    ComponentOneComponent,
    UploadDialogComponent,
    DndDirective,
    ProgressComponent,
  ],
  imports: [CommonModule, ModuleOneRouting, FlexLayoutModule, MaterialModule],
  exports: [UploadDialogComponent],
})
export class ModuleOneModule {}
