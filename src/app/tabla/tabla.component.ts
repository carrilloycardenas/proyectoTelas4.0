import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from '../interfaces/Articulo';
import { ArticulosService } from '../services/articulos.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent {
  @Output() seleccionArticulo = new EventEmitter();

  articulos: Articulo[] = [];

  articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: '',
    descripcion: '',
    stock: 0,
    precioUnitario: 0,
    Color: ''
  }

  busqueda: number = 0

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.articulos = this.articulosService.returnData();
  }

  constructor(private articulosService: ArticulosService,
    private router: Router) {

  }

  borrar(articulo: Articulo) {
    const confirmacion = confirm(`¿Estas seguro de borrar el articulo? ${articulo.Nombre}`)
    if (confirmacion) {
      this.articulos = this.articulos.filter(a => a.idProductos != articulo.idProductos);
      this.articulosService.eliminar(articulo);
    }
  }

  buscar() {
    this.articulos = this.articulos.filter(a => a.idProductos == this.busqueda);
  }

  seleccionar(articulo: Articulo) {
    this.articulosSeleccionado = {
      ...articulo
      //Imprime todos los atributos de Articulo
    }
    this.router.navigate(["modificararticulo/" + articulo.idProductos])

    //this.seleccionArticulo.emit(this.seleccionArticulo);
  }
}
