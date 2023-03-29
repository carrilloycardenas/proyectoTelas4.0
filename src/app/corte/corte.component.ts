import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from '../interfaces/Articulo';
import { ArticulosService } from '../services/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})
export class CorteComponent {
  status: string = "";
  [x: string]: any;
  @Output() seleccionArticulo = new EventEmitter();

  articulos: Articulo[] = [];
  artiAux: Articulo[] = [];

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
      this.articulos = data;
      this.artiAux = data;
    });

    this.activatedRouter.params.subscribe(params => {
      const id: number = params["id"];
      this.status = id == undefined ? "agregar" : "modificar";
      this.articulosSeleccionado = id == undefined ?
        this.articulosSeleccionado :
        this.articulosService.seleccionar(id);
      this.articuloModificar = {
        ...this.articulosSeleccionado
      }
    });
  }

  agregar() {
    if (this.articuloModificar.idProductos == 0 || this.articuloModificar.Nombre == '') {
      //alert("Es necesario llenar todas los cuadros de texto");

      return;
    }
    if (this.articulosService.validacion(this.articuloModificar)) {
      //this.msgText = "El idProductos que intenta registrar ya existe";
      //this.msgAlert = true;
      return;
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
  regresar() {
    this.router.navigate(['/corte']);
  }

}
