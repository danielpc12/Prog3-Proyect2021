import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_cod_bloque: {
        name: 'fk_cod_bloque',
        entity: 'Bloque',
        entityKey: 'Codigo',
        foreignKey: 'codBloque',
      },
    },
  },
})
export class Inmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;

  @property({
    type: 'string',
    required: true,
  })
  Identificador: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @belongsTo(() => Bloque, {name: 'Bloque'})
  codBloque: number;

  @hasMany(() => Solicitud, {keyTo: 'codInmueble'})
  solicitudes: Solicitud[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
