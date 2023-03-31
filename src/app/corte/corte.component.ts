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
  msgText: string = "";
  msgAlert: boolean = false;
  [x: string]: any;
  @Output() seleccionArticulo = new EventEmitter();

  articulos: Articulo[] = [];
  artiAux: Articulo[] = [];

  carrito: Ventas[] = [];

  @Input() articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: "",
    Descripcion: "",
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

  cerrarAlert(){
    this.msgAlert = false;
  }

  agregar() {
    const fecha = new Date()
    const aux : Ventas = {
      Fecha: '01/01/01',
      Nombre: 'hola',
      idProducto: 0,
      Cantidad: 0,
      precio: 0
    }

    aux.Fecha = `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDay()}`
    aux.idProducto = this.artiAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda)[0].idProductos
    aux.Cantidad = this.cantidad
    aux.precio = (this.artiAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda)[0].precioUnitario * this.cantidad)
    aux.Nombre = this.artiAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda)[0].Nombre
    if(this.cantidad > 0 && this.cantidad <= this.artiAux.filter(a => a.idProductos == this.busqueda || a.Nombre == this.busqueda)[0].Stock){
      // aux[0].Stock = this.cantidad;
      this.carrito.push(aux);
    } else {
      alert('No hay suficiente producto')
    }
  }

  registrarVenta(){
    if(this.carrito.length > 0){
      this.articulosService.agregarVenta(this.carrito)
    }
    this.carrito = []
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

  prodBorrar(){

  }
}
