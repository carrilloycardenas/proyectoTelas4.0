import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from '../interfaces/Articulo';
import { ArticulosService } from '../services/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  title = 'practica02';
  msgText: string = "";
  msgAlert: boolean = false;
  status: string = "";

  @Input() articulosSeleccionado: Articulo = {
    idProductos: 0,
    Nombre: "",
    descripcion: "",
    stock: 0,
    precioUnitario: 0,
    Color: ""
  }

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
    this.activatedRouter.params.subscribe(params => {
      console.log(params);
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
      this.msgText = "Existen campos vacios";
      this.msgAlert = true;
      return;
    }
    if (this.articulosService.validacion(this.articuloModificar)) {
      this.msgText = "El idProductos que intenta registrar ya existe";
      this.msgAlert = true;
      return;
    }
    this.articulosService.agregar({
      ...this.articuloModificar
    });

    this.articuloModificar = {
      idProductos: 0,
      Nombre: "",
      descripcion: "",
      stock: 0,
      precioUnitario: 0,
      Color: ""
    }
  }
  regresar() {
    this.router.navigate(['/articulos']);
  }
  modificar() {
    Swal.fire({
      title: '¿Estas seguro de modificar el producto?',
      text: "No podras revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modificar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.articulosSeleccionado)
        console.log(this.articuloModificar)
        this.articulosService.modificar(this.articulosSeleccionado, this.articuloModificar);
        this.router.navigate(['/articulos']); //para redireccionar 

      }
    })

  }
}
