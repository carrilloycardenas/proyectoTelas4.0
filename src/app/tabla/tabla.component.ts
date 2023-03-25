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
  artiAux: Articulo[] = [];

  articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: '',
    descripcion: '',
    stock: 0,
    precioUnitario: 0,
    Color: ''
  }

  busqueda:any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.articulos = this.articulosService.returnData();
    this.artiAux = this.articulosService.returnData();
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

  buscar(){
    if(this.busqueda){
      this.articulos = this.artiAux.filter(a => a.codigo == this.busqueda || a.descripcion == this.busqueda);
    }
    else{
      this.articulos = this.artiAux;
    }
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
