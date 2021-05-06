export interface User {
  rut: string;
  clave: string;
}

export interface UserResponse extends User {
  id_cliente: number;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  message: string;
  token: string;
  status: number;
  result: boolean;
}