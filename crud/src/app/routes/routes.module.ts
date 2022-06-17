import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../componentes/home/home.component';
import { EmpleadosComponent } from '../componentes/empleados/empleados.component';
import { EmpleadoComponent } from '../componentes/empleado/empleado.component';

const APP_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
  },
  {
    path: 'empleado/:id',
    component: EmpleadoComponent,
  },

  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);