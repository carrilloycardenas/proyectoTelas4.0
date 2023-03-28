import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../interfaces/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  articulos: Articulo[] = [  ]

  baseURL: string = 'http://localhost:3001/api/getProductos';
  constructor(private http: HttpClient) { }

  // returnData() {
  //   return this.articulos;
  // }

  returnData() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.baseURL);
  }



  validacion(articulo: Articulo): boolean {
    const busqueda = this.articulos.filter(a => a.idProductos == articulo.idProductos);
    if (busqueda.length != 0) {
      return true;
    }
    return false;
  }

  agregar(articulo: Articulo) {
    // this.articulos.push(articulo);
    return this.http.post<Articulo>(this.baseURL,articulo)
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
    const index = articulo.idProductos
    // this.articulos.splice(index, 1);
    return this.http.delete<Articulo>(this.baseURL+`/${index}`)
  }
}
