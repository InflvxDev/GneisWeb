export interface Reserva {
    id : number;
    fechaReserva : string;
    cedula : string;
    nombreCliente : string;
    idHabitacion : number;
    descripcionHabitacion : string;
    costoDia : string;
    acompanantes : number;
    fechaEntrada? : string;
    fechaSalida? : string;
    diaHospedaje? : number;
    total? : string;
}