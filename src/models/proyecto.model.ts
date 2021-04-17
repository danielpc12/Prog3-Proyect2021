import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      fk_cod_ciudad_proyecto: {
        name: 'fk_cod_ciudad_proyecto',
        entity: 'Ciudad',
        entityKey: 'Codigo',
        foreignKey: 'codCiudad',
      },
    },
  },
})
export class Proyecto extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'buffer',
    required: true,
  })
  Imagen: Buffer;

  @belongsTo(() => Ciudad, {name: 'Ciudad'})
  codCiudad: number;

  @hasMany(() => Bloque, {keyTo: 'codProyecto'})
  bloques: Bloque[];

  constructor(data?: Partial<Proyecto>) {
    super(data);
  }
}

export interface ProyectoRelations {
  // describe navigational properties here
}

export type ProyectoWithRelations = Proyecto & ProyectoRelations;
