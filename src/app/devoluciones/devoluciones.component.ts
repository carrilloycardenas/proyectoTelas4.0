import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from '../interfaces/Articulo';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent {
  status: string = "";
  [x: string]: any;
  @Output() seleccionArticulo = new EventEmitter();

  devolu: Articulo[] = [];
  devoluAux: Articulo[] = [];

  @Input() articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: "",
    descripcion: "",
    Stock: 0,
    precioUnitario: 0,
    Color: ""
  }

  busqueda: any;

  articuloModificar: Articulo = {
    ...this.articulosSeleccionado
  }

  constructor(private articulosService: ArticulosService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.articulosService.returnData().subscribe((data) => {
      console.log(data);
      this.devolu = data;
      this.devoluAux = data;
    });
  }

  agregar() {
    if (this.articuloModificar.idProductos == 0 || this.articuloModificar.Nombre == '') {
      console.log("Aqui devuelve");
    }
    this.articulosService.agregar({
      ...this.articuloModificar
    });

    this.articuloModificar = {
      idProductos: 0,
      Nombre: "",
      descripcion: "",
      Stock: 0,
      precioUnitario: 0,
      Color: ""
    }
  }
  buscar() {
    if (this.busqueda) {
      this.devolu = this.devoluAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda);
      if (this.devolu.length == 0) {
        alert('No se encontro el producto')
        this.devolu = this.devoluAux
      }
    }
    else {
      this.devolu = this.devoluAux;
    }
  }
  regresar() {
    this.router.navigate(['/devoluciones']);
  }

}
