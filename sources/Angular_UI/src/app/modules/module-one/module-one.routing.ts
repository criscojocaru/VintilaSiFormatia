import { RouterModule, Routes } from '@angular/router';

// Components
import { ComponentOneComponent } from './component-one/component-one.component';

// Routes
const moduleRoutes: Routes = [
  {
    path: 'predict',
    component: ComponentOneComponent,
  },
];

export const ModuleOneRouting = RouterModule.forRoot(moduleRoutes);
