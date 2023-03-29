import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CorteComponent } from './corte/corte.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';

const routes: Routes = [
  { path: 'articulos', component: TablaComponent },
  { path: 'agregararticulo', component: FormularioComponent },
  { path: "modificararticulo/:id", component: FormularioComponent },
  { path: 'corte', component: CorteComponent },
  { path: 'devoluciones', component: DevolucionesComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
