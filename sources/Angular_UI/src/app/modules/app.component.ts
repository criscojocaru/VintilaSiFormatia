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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '../core/http/loading-service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Covid Inference';
  isIframe: boolean;
  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService, private router: Router) {
    this.isIframe = window !== window.parent && !window.opener;

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingService.show();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingService.hide();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

  ngOnDestroy() {}
}
