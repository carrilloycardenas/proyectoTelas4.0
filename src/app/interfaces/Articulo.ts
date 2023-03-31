export interface Articulo {
    idProductos: number;
    Nombre: string;
    Descripcion: string;
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
