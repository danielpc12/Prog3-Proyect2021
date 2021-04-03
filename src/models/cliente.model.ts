import {Entity, model, property} from '@loopback/repository';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  Documento?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_Nacimiento: string;

  @property({
    type: 'any',
    required: true,
  })
  Fotografia: any;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  Ingresos: number;

  @property({
    type: 'string',
    required: true,
  })
  Datos_Trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  Tiempo_Trabajoact: string;

  @property({
    type: 'string',
    required: true,
  })
  Nom_Refam: string;

  @property({
    type: 'string',
    required: true,
  })
  Tel_Refam: string;

  @property({
    type: 'string',
    required: true,
  })
  Nom_refper: string;

  @property({
    type: 'string',
    required: true,
  })
  Tel_Refper: string;


  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
