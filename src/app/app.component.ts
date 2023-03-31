import { Component, ViewChild } from '@angular/core';
import { Articulo } from './interfaces/Articulo';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  @ViewChild("SideBar") sideBar: SidebarComponent | undefined;

  articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: "",
    Descripcion: "",
    Stock: 0,
    precioUnitario: 0,
    Color: ""
  }

  seleccion(articulo: Articulo) {
    console.log(articulo);
    this.articulosSeleccionado = articulo;
  }

  mostrarSideBar() {
    this.sideBar?.mostrarSideBar();
  }
}


