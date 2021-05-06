export interface Destinatario {
    id_destinatario: number;
    id_cliente: number;
    rut: string;
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    correo: string;
    telefono: string;
    id_banco: string;
    id_tipo_cuenta: number;
    numero_cuenta: string;
    nombre_cuenta: string;
  }

  export interface DestinatarioResponse extends Destinatario {
    nombre: string;
    banco: string;
  }