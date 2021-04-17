import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {Pagos} from './pagos.model';

@model({
  settings: {
    foreignKeys: {
      fk_doc_cliente: {
        name: 'fk_doc_cliente',
        entity: 'Cliente',
        entityKey: 'Documento',
        foreignKey: 'docCliente',
      },
      fk_cod_inmueble: {
        name: 'fk_cod_inmueble',
        entity: 'Inmueble',
        entityKey: 'Codigo',
        foreignKey: 'codInmueble',
      },
    },
  },
})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'number',
  })
  Oferta?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  Estado: boolean;

  @belongsTo(() => Cliente, {name: 'Cliente'})
  docCliente: number;

  @belongsTo(() => Inmueble, {name: 'Inmueble'})
  codInmueble: number;

  @hasMany(() => Pagos, {keyTo: 'codSolicitud'})
  pagos: Pagos[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
