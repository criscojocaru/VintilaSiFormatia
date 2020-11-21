import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http/http.service';

// Services

// components


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [CommonModule],
  providers: [HttpService]
})
export class CoreModule { }
