/**
 *    Copyright 2016 Sven Loesekann
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import * as config from './app-config.json';
import { Configuration, Logger, CacheLocation } from 'msal';
import { LogLevel } from 'msal';

// external angular components,modules,directives
import { ModuleOneModule } from '../modules/module-one/module-one.module';
import { AppComponent } from './app.component';

// core Module
import { CoreModule } from '../core/core.module';

// shared Module
import { SharedModule } from '../shared/shared.module';

// routes
import { AppRoutingModule } from './app-routing.module';
import { LoadingService } from '../core/http/loading-service';
import { LoadingInterceptor } from '../core/http/loading-interceptor';

// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log('client logging' + message);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ModuleOneModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    BrowserAnimationsModule],
  bootstrap: [AppComponent],
  providers: [
    [LoadingService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor, multi: true
    },
  ]
})
export class AppModule { }
