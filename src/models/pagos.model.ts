import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_cod_solicitud: {
        name: 'fk_cod_solicitud',
        entity: 'Solicitud',
        entityKey: 'Codigo',
        foreignKey: 'codSolicitud',
      },
    },
  },
})
export class Pagos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Comprobante?: number;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @belongsTo(() => Solicitud, {name: 'Solicitud'})
  codSolicitud: number;

  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
