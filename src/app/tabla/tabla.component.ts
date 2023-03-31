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
    Descripcion: '',
    Stock: 0,
    precioUnitario: 0,
    Color: ''
  }

  busqueda: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.articulos = this.articulosService.returnData();
    // this.artiAux = this.articulosService.returnData();

    this.articulosService.returnData().subscribe((data)=>{
      console.log(data);
      this.articulos = data;
      this.artiAux = data;
    });
  }

  constructor(private articulosService: ArticulosService,
    private router: Router) {

  }

  borrar(articulo: Articulo) {
    const confirmacion = confirm(`¿Estas seguro de borrar el articulo? ${articulo.Nombre}`)
    if (confirmacion) {
      // this.articulos = this.articulos.filter(a => a.idProductos != articulo.idProductos);
      this.articulosService.eliminar(articulo).subscribe(data => console.log(data));
      this.articulos.splice(this.articulos.indexOf(articulo),1)
    }
  }

  buscar() {
    if (this.busqueda) {
      this.articulos = this.artiAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda);
      if (this.articulos.length == 0) {
        alert('No se encontro el producto')
        this.articulos = this.artiAux
      }
    }
    else {
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
