import { Component, ViewChild } from '@angular/core';
import { Articulo } from './interfaces/Articulo';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
@ViewChild("SideBar") sideBar : SidebarComponent | undefined;

  articulosSeleccionado: Articulo = {
    codigo: 0,
    descripcion: "",
    precio: 0
  }

  seleccion(articulo: Articulo) {
    console.log(articulo);
    this.articulosSeleccionado = articulo;
  }

  mostrarSideBar () {
    this.sideBar?.mostrarSideBar();
  }
}


