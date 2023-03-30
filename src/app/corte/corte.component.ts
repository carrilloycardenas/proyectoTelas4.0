import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo, Ventas } from '../interfaces/Articulo';
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

  carrito: Ventas[] = [];

  @Input() articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: "",
    descripcion: "",
    Stock: 0,
    precioUnitario: 0,
    Color: ""
  }

  busqueda: any;
  cantidad: number = 0;

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
    const aux = this.artiAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda);
    if(this.cantidad != 0){
      aux[0].Stock = this.cantidad;
      this.carrito.push(...aux);
    }
  }

  registrarVenta(){
    if(this.carrito != null){
      //this.articulosService.agregarVenta(this.carrito).subscribe(data => {console.log(data)});
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
    this.router.navigate(['/']);
  }

}
