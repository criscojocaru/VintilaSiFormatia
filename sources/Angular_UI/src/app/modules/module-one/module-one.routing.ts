import { RouterModule, Routes } from '@angular/router';

// Components
import { ComponentOneComponent } from './component-one/component-one.component';
import { MsalGuard } from '@azure/msal-angular';
import { GroupGuardService } from '../../core/group-guard.service';
import * as config from '../app-config.json';

// Routes
const moduleRoutes: Routes = [
  {
    path: 'predict',
    component: ComponentOneComponent,
  },
];

export const ModuleOneRouting = RouterModule.forRoot(moduleRoutes);
