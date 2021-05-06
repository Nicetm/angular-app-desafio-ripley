export interface BancoResponse {
  id: number;
  name: string;
}

export interface TipoCuentas {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface TipoCuentasResponse extends TipoCuentas {
  message: string;
  status: number;
}