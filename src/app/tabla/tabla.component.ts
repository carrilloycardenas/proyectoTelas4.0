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
    codigo: 0,
    descripcion: '',
    precio: 0
  }

  busqueda:number = 0

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.articulos = this.articulosService.returnData();
  }

  constructor(private articulosService: ArticulosService,
              private router: Router) {

  }

  borrar(articulo: Articulo) {
    const confirmacion = confirm(`¿Estas seguro de borrar el articulo? ${articulo.descripcion}`)
    if (confirmacion) {
      this.articulos = this.articulos.filter(a => a.codigo != articulo.codigo);
      this.articulosService.eliminar(articulo);
    }
  }

  buscar(){
    console.log(this.articulos)
    this.articulos = this.articulos.filter(a => a.codigo == this.busqueda);
    console.log(this.articulos)
  }

  seleccionar(articulo: Articulo) {
    this.articulosSeleccionado = {
      ...articulo
      //Imprime todos los atributos de Articulo
    }
    this.router.navigate(["modificararticulo/" + articulo.codigo])

    //this.seleccionArticulo.emit(this.seleccionArticulo);
  }
}
