import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Pais} from './pais.model';
import {Proyecto} from './proyecto.model';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_cod_pais: {
        name: 'fk_cod_pais',
        entity: 'Pais',
        entityKey: 'Codigo',
        foreignKey: 'codPais',
      },
    },
  },
})
export class Ciudad extends Entity {
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
  Nombre: string;

  @belongsTo(() => Pais, {name: 'Pais'})
  codPais: number;

  @hasMany(() => Proyecto, {keyTo: 'codCiudad'})
  proyectos: Proyecto[];

  @hasMany(() => Cliente, {keyTo: 'codCiudad'})
  clientes: Cliente[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
