export interface Articulo {
    idProductos: number;
    Nombre: string;
    descripcion: string;
    Stock: number;
    precioUnitario: number;
    Color: string;
}

export interface Ventas{
  Fecha: string;
  idProducto: number;
  Nombre: string;
  Cantidad: number;
  precio: number;
}
