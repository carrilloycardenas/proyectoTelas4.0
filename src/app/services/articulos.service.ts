import { Injectable } from '@angular/core';
import { Articulo } from '../interfaces/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  articulos: Articulo[] = [
    { codigo: 1, descripcion: "papa", precio: 10.55 },
    { codigo: 2, descripcion: "manzana", precio: 10.55 },
    { codigo: 3, descripcion: "melon", precio: 10.55 },
    { codigo: 4, descripcion: "cebolla", precio: 10.55 },
    { codigo: 5, descripcion: "fresa", precio: 10.55 }
  ]
  constructor() {

  }

  returnData() {
    return this.articulos;
  }

  validacion(articulo: Articulo): boolean {
    const busqueda = this.articulos.filter(a => a.codigo == articulo.codigo);
    if (busqueda.length != 0) {
      return true;
    }
    return false;
  }

  agregar(articulo: Articulo) {
    this.articulos.push(articulo);
  }
 
  seleccionar(codigo : number) : Articulo {
    return {...this.articulos.find(art => art.codigo == codigo)!};
  }

  getIndex(articulo: Articulo): number {
    let index = 0;
    this.articulos.forEach(articulo => {
      if (articulo.codigo === articulo.codigo) {
        index = this.articulos.indexOf(articulo);
      }
    });
    return index;
  }

  modificar(articulo: Articulo) {
    const index = this.getIndex(articulo);
    this.articulos[index] = { ...articulo };
  }

  eliminar(articulo: Articulo) {
    const index = this.getIndex(articulo);
    this.articulos.splice(index, 1);
  }
}
