import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { Aprende } from './features/aprende/aprende';
import { SobreProyecto } from './features/sobre-proyecto/sobre-proyecto';
import { Consentimiento } from './features/estudio/consentimiento/consentimiento';
import { Datos } from './features/estudio/datos/datos';
import { Instrucciones } from './features/estudio/instrucciones/instrucciones';
import { Ensayo } from './features/estudio/ensayo/ensayo';
import { Fin } from './features/estudio/fin/fin';
import { Admin } from './features/admin/admin';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'aprende', component: Aprende },
  { path: 'proyecto', component: SobreProyecto },
  {
    path: 'estudio',
    children: [
      { path: '', component: Consentimiento },
      { path: 'datos', component: Datos },
      { path: 'instrucciones', component: Instrucciones },
      { path: 'ensayo', component: Ensayo },
      { path: 'fin', component: Fin },
    ],
  },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' },
];
