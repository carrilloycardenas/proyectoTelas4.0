import { Injectable } from '@angular/core';
import { Articulo } from '../interfaces/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  articulos: Articulo[] = [
    { idProductos: 1, Nombre: "tela1", descripcion: "redondo", stock: 10, precioUnitario: 20, Color: "rojo" },
    { idProductos: 2, Nombre: "aguja1", descripcion: "redondo", stock: 15, precioUnitario: 20, Color: "rojo" },
    { idProductos: 3, Nombre: "piel1", descripcion: "redondo", stock: 55, precioUnitario: 20, Color: "rojo" },
    { idProductos: 4, Nombre: "vinipiel1", descripcion: "redondo", stock: 15, precioUnitario: 20, Color: "rojo" },
    { idProductos: 5, Nombre: "tela2", descripcion: "redondo", stock: 5, precioUnitario: 20, Color: "rojo" }
  ]
  constructor() { }

  returnData() {
    return this.articulos;
  }

  validacion(articulo: Articulo): boolean {
    const busqueda = this.articulos.filter(a => a.idProductos == articulo.idProductos);
    if (busqueda.length != 0) {
      return true;
    }
    return false;
  }

  agregar(articulo: Articulo) {
    this.articulos.push(articulo);
  }

  seleccionar(idProductos: number): Articulo {
    return { ...this.articulos.find(art => art.idProductos == idProductos)! };
  }

  getIndex(articulo: Articulo): number {
    let index = 0;
    this.articulos.forEach(ar => {
      if (ar.idProductos === articulo.idProductos) {
        index = this.articulos.indexOf(ar);
      }
    });
    return index;
  }

  modificar(articulo: Articulo, articuloMod: Articulo) {
    const index = this.getIndex(articulo);
    this.articulos[index] = { ...articuloMod };
  }

  eliminar(articulo: Articulo) {
    console.log(articulo);
    const index = this.getIndex(articulo);
    this.articulos.splice(index, 1);
  }
}
