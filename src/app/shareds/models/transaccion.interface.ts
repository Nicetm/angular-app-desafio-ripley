export interface Transaccion {
    id_usuario: number;
    id_destinatario: number;
    id_banco: number;
    fecha: string;
    hora: string;
}

export interface TransaccionResponse extends Transaccion {
    saldo: number;
    status: number;
    message: string;
}